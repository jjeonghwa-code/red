import mongoose from 'mongoose';
import Bcrypt from 'bcrypt';
import Promise from 'bluebird';

const bcrypt = Promise.promisifyAll(Bcrypt);
const { Schema } = mongoose;
const Account = new Schema({
  email: {
    type: String,
    required: true,
    index: {
      unique: true,
    },
    match: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  passwordChangeToken: {
    type: String,
  },
  created: {
    type: Date,
    required: true,
    default: new Date(),
  },
  appList: [
    {
      type: Schema.Types.ObjectId,
      ref: 'app',
      unique: true,
    },
  ],
  level: {
    type: Number,
    default: 0,
  },
});
Account.pre('save', async function hashing(next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    this.password = await bcrypt.hash(this.password, 10);
    return next();
  } catch (error) {
    return next(error);
  }
});
Account.pre('updateOne', async function hashing(next) {
  const u = this.getUpdate();
  const update = u.$set;
  if (update && update.password) {
    try {
      const prevPassword = update.password;
      delete update.password;
      update.password = await bcrypt.hash(prevPassword, 10);
      u.$set = update;
    } catch (error) {
      return next(error);
    }
  }
  this.update({}, u);
  return next();
});
Account.methods.passwordIsValid = function passwordIsValid(password) {
  try {
    return bcrypt.compareAsync(password, this.password);
  } catch (err) {
    throw err;
  }
};
const model = mongoose.model('account', Account);

export default model;
