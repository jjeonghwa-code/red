import mongoose from 'mongoose';

const { Schema, Types } = mongoose;
const Project = new Schema({
  thumbnails: [String],
  accountId: Schema.Types.ObjectId,
  sizeName: String,
  productName: String,
  projectId: String,
  psCode:String,
  templateUrl: String,
  datetime: {
    type: Number,
    default: Date.now,
  },
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

export default mongoose.model('project', Project);
