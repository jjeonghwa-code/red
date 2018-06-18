import mongoose from 'mongoose';

const { Schema, Types } = mongoose;
const Project = new Schema({
  thumbnails: [String],
  accountId: Schema.Types.ObjectId,
  sizeName: String,
  productName: String,
  psCode:String,
  templateToken: String,
  datetime: {
    type: Date,
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
  views: Array, // variableData
  order_datetime: {
    type: Date,
  },
  order_status: {
    type: Number,
    default: 0,
  }, // 0: not_ordered, 1: tentative, 2: definitive
  userId: String,
  projectId: String,
  token: String, //templateToken
  orderInfo: {
    order_count: Number,
    total_price: Number,
    partner_order_id: String,
    order_name: String,
    vdp_dataset: Object,
  }
});

export default mongoose.model('project', Project);
