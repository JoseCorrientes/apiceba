import Logs from "../models/Logs.model.js" 

const getAllLogsService = async () => {

  const logs = await Logs.find();
  return logs;
};

export { getAllLogsService };