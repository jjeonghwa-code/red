import mongoose from 'mongoose';

const { Schema, Types } = mongoose;
const Print = new Schema({
  thumbnailURL: String,
  name: String,
  size: String,
  quantity: {
    type: Number,
    default: 1,
  },
  price: {
    type: Number,
    default: 1000,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model('print', Print);
