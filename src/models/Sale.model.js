// import { Schema, model } from "mongoose";
const { Schema, model }=require("mongoose");

const saleSchema = new Schema({
  saleCode: {
    type: String,
    require: [true, 'saleCode is required']
  },
  readytoSend: {
    type: String,
    default: 'Pendign'
  },
  paid_status: {
    type: String,
    default: 'Pending',
    require: [true, 'paid_status is required']
  },
  authorization_code: {
    type: String,
    default: 'Pending',
    require: [true, 'authorization_code is required']
  },
  transaction_code: {
    type: String,
    default: 'Pending',
    require: [true, 'transaction_code is required']
  },
  transaction_date: {
    type: String,
    default: 'Pending',
    require: [true, 'transaction_date is required']
  },
  error: {
    type: String,
    default: 'Pending',
    require: [true, 'Error is required']
  },
  dataSale: {
    type: Object,
  },
  customerData: {
    type: Object,

  },
  userSession: {
    type: Object,
  }


},
{
  timestamps: true,
  versionKey: false,
});

const Sale = model('Sale', saleSchema);
// export default Sale;
module.exports ={Sale};
