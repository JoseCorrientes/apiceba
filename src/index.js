import express from "express";
import Colors from '@colors/colors';
import 'dotenv/config';
import cors from 'cors';
import morgan from 'morgan';
import router from "./routes/index.routes.js";
import { connectDB } from "./config/dbConnetion.js";

import cron, { schedule } from 'node-cron'
import programedLogSend from "./utils/programedLogSend.js";


const PORT = process.env.PORT || 3002;

const app = express();

app.use(cors({origin: '*'}));
app.use(express.json());
app.use(morgan('dev'));
app.use('/api/v1', router);


function main() {

  cron.schedule('56 13 12 * *', async ()=>{
    
    let resultado = await programedLogSend()
    },{ scheduled: true})  

  app.listen(PORT, () => {
    console.log(Colors.bgBrightCyan.black(`==>> Server is running on http://localhost:${PORT} `))
  });
  connectDB();
}

main();






