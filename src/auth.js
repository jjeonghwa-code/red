import HttpBearer from 'passport-http-bearer';
import passport from 'passport';

import {
  fromMongo,
} from './lib/dbConnector';
import { Account } from './models';

const { Strategy } = HttpBearer;

// PASSPORT SETTING
passport.use(new Strategy(async (id, cb) => {
  try {
    const account = await Account
      .findById(id)
      .select({ password: 0 })
      .populate('rootId');
    if (!account) {
      return cb(null, { unauthorized: true });
    }
    const obj = account.toObject();
    if(obj.rootId) {
      obj.root = obj.rootId;
      obj.rootId = obj.root._id;
    }
    return cb(null, fromMongo(obj));
  } catch (error) {
    return cb(null, { unauthorized: true });
  }
}));

export default function (req, res, next) {
  passport.authenticate('bearer', { session: false }, (err, user) => {
    const userFound =
      user && !Object.hasOwnProperty.call(user, 'unauthorized') && !user.unauthorized ?
        user : null;
    if (err) { return next(err); }
    if (!userFound) { return res.status(401).json({ message: 'Unauthorized' }); }
    delete userFound.password;
    req.user = userFound;
    return next();
  })(req, res, next);
}
