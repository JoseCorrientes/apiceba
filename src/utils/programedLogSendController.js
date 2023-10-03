import { getAllLogsService} from './programedLogSendService.js';


const getAllLogsController = async (req, res) => {

  try {
    const logsData = await getAllLogsService();

    if(logsData.length < 1) return 404
    return logsData
  } catch (error) {
    return 404;
  }
};

export { getAllLogsController};