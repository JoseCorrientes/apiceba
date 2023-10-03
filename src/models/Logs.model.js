import { Schema, model } from "mongoose";

const logsSchema = new Schema({
  ip: {
    type: String,
    require: [true, 'Ip is required']
  },
  date: {
    type: String,
    require: [true, 'Date is required']
  },
  sessionId: {
    type: String,
    require: [true, 'SessionId is required']
  },
  component: {
    type: String,
    require: [true, 'Component is required']
  },
  status: {
    type: String,
    require: [true, 'Status is required']
  },
  description: {
    type: String,
    require: [true, 'Description is required']
  }


},
{
  timestamps: true,
  versionKey: false,
});

const Logs = model('Logs', logsSchema);
export default Logs;
