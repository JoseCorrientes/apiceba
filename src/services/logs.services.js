import Logs from "../models/Logs.model.js";

const getAllLogsService = async () => {

  const logs = await Logs.find();
  return logs;
};



const createLogsService = async (logs) => {
  const result = await Logs.create(logs);
  return result;

};



export {
  getAllLogsService,
  createLogsService
}
