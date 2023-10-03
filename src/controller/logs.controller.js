// import Colors from '@colors/colors';
// import { matchedData } from 'express-validator';
// import { getAllLogsService, createLogsService } from '../services/logs.services.js';
const Colors = require ('@colors/colors')
const { matchedData } =require('express-validator');
const { getAllLogsService, createLogsService } = require('../services/logs.services.js');

const getAllLogsController = async (req, res) => {

  try {
    const logsData = await getAllLogsService();

    if(logsData.length < 1) return res.status(404).send('Logs Not Found')
    return res.status(200).send(logsData)
  } catch (error) {
    console.log(Colors.bgBrightRed.black(`** Error: ${error.message} **`));
    return res.status(500).json({message: 'Internal server error', Error: error.message});
  }
};

const createLogController = async (req, res) => {

  try {
    req = matchedData(req)

    const createLog = await createLogsService(req)

    return res.status(200).send('Created Log Successfully')
  } catch (error) {
    console.log(Colors.bgBrightRed.black(`** Error: ${error.message} **`));
    return res.status(500).json({message: 'Internal server error', Error: error.message});
  }
};

    


// export {
//   getAllLogsController,
//   createLogController,
// }
module.exports= {
  getAllLogsController,
  createLogController,
}
