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
      .findOne({ _id: id })
      .select({ password: 0 })
      .exec();
    if (!account) {
      return cb(null, { unauthorized: true });
    }
    return cb(null, fromMongo(account.toObject()));
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
    if (!userFound) { return res.status(401).json({ message: '로그인이 필요합니다.' }); }
    delete userFound.password;
    req.user = userFound;
    return next();
  })(req, res, next);
}
