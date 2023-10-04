// import { Schema, model } from "mongoose";
const { Schema, model } = require("mongoose");


const paymentSchema = new Schema({
  paid_status: {
    type: String,
    require: [true, 'paid_status is required']
  },
  paid_type: {
    type: String,
    require: [true, 'paid_type is required']
  },
  reference: {
    type: String,
    require: [true, 'reference is required']
  },
  authorization_code: {
    type: String,
    require: [true, 'authorization_code is required']
  },
  transaction_code: {
    type: String,
    require: [true, 'transaction_code is required']
  },
  transaction_date: {
    type: String,
    require: [true, 'transaction_date is required']
  },
  error: {
    type: String,

  }


},
{
  timestamps: true,
  versionKey: false,
});

const Payment = model('Payment', paymentSchema);
// export default Payment;
module.exports={Payment};
