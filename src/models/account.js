import mongoose from 'mongoose';
import Bcrypt from 'bcrypt';
import Promise from 'bluebird';

const bcrypt = Promise.promisifyAll(Bcrypt);
const { Schema, Types } = mongoose;
const Account = new Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  created: {
    type: Date,
    required: true,
    default: Date.now,
  },
  name: String,
  phone: String,
  email: String,
  type: {
    type: String,
    default: 'serviceManager', //franchisee, supervisor
  },
  isInitial: {
    type: Boolean,
    default: false,
  },
  company: {
    name: String,
    location: String,
  },
  rootId: {
    type: Schema.Types.ObjectId,
    ref: 'account',
  },
});
// Account.pre('save', async function hashing(next) {
//   if (!this.isModified('password')) {
//     return next();
//   }
//   try {
//     this.password = await bcrypt.hash(this.password, 10);
//     return next();
//   } catch (error) {
//     return next(error);
//   }
// });
// Account.pre('updateOne', async function hashing(next) {
//   const u = this.getUpdate();
//   const update = u.$set;
//   if (update && update.password) {
//     try {
//       const prevPassword = update.password;
//       delete update.password;
//       update.password = await bcrypt.hash(prevPassword, 10);
//       u.$set = update;
//     } catch (error) {
//       return next(error);
//     }
//   }
//   this.update({}, u);
//   return next();
// });
Account.methods.passwordIsValid = function passwordIsValid(password) {
  try {
    return password === this.password;
    // return bcrypt.compareAsync(password, this.password);
  } catch (err) {
    throw err;
  }
};
const model = mongoose.model('account', Account);

export default model;
