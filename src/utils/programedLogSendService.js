// import Logs from "../models/Logs.model.js" 
const Logs=require("../models/Logs.model.js") 


const getAllLogsService = async () => {

  const logs = await Logs.find();
  return logs;
};

// export { getAllLogsService };
module.exports ={ getAllLogsService };