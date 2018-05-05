import 'babel-polyfill';
import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import Promise from 'bluebird';
import ipCountry from 'ip-country';
import fs from 'fs';
import config from './config';
import logging from './lib/logging';
import api from './routes';

const app = express();

app.use(ipCountry.setup({
  mmdb: path.join(__dirname, '../', 'country.mmdb'),
  fallbackCountry: 'US',
  exposeInfo: false,
}));

app.set('trust proxy', true);

// Add the request logger before anything else so that it can
// accurately log requests.
app.use(logging.requestLogger);

// 몽고디비 연결 설정
mongoose.Promise = Promise;

const db = mongoose.connection;

const MONGO_URL = config.get('MONGO_URL');
mongoose.connect(MONGO_URL, {
  reconnectTries: 100,
  reconnectInterval: 1000,
});

// open 이벤트는 1회만 일어난다.
db.once('open', () => {
  logging.info(`[MONGO DB URL] : ${MONGO_URL}`);
});
let dbTimer = null;
db.on('disconnected', () => {
  logging.error('MongoDB Disconnected');
  dbTimer = new Date().getTime();
});
db.on('reconnected', () => {
  let elapsed = 0;
  if (dbTimer !== null) {
    elapsed = new Date().getTime() - dbTimer;
  }
  logging.info(`MongoDB Reconnected, elalpsed: ${elapsed}`);
  dbTimer = null;
});
db.on('error', (error) => {
  logging.error(error);
  throw error;
});

// POST 연결을 위한 설정
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));
app.use(bodyParser.json({ limit: '5mb' }));

// API
app.use('/api', api);

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  const sendParsedHTML = (req, res) => {
    let lang = 'kr';
    if (res.locals && res.locals.country) {
      switch(res.locals.country) {
        case 'US': lang = 'en'; break;
        case 'JP': lang = 'jp'; break;
        case 'KR': lang = 'kr'; break;
        default: lang = 'en'; break;
      }
    }
    fs.readFile(path.join(__dirname, '../', 'client/build', 'index.html'), 'utf8', (err, data) => {
      res.send(data.replace(/__LANGUAGE__/, `"${lang}"`)).end();
    });
  };
  app.get('/',sendParsedHTML);
  app.get('/index.html', sendParsedHTML);
  app.use(express.static(path.join(__dirname, '../', 'client/build')));
  app.get('/*', sendParsedHTML);
}

// Add the error logger after all middleware and routes so that
// it can log errors from the whole application. Any custom error
// handlers should go after this.
app.use(logging.errorLogger);

// Basic 404 handler
app.use((req, res) => {
  res.status(404).send('Not Found');
});

// Basic error handler
app.use((err, req, res) => {
  // If our routes specified a specific response, then send that. Otherwise,
  // send a generic message so as not to leak anything.
  res.status(500).send(err.response || 'Something broke!');
});

// Start the server
const server = app.listen(config.get('PORT'), () => {
  const { port } = server.address();
  logging.info(`App listening on port ${port}`);
});

export default app;
