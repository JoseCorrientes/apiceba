// import express from "express";
// import Colors from '@colors/colors';
// import 'dotenv/config';
// import cors from 'cors';
// import morgan from 'morgan';
// import router from "./routes/index.routes.js";
// import { connectDB } from "./config/dbConnetion.js";

// import cron, { schedule } from 'node-cron'
// import programedLogSend from "./utils/programedLogSend.js";

const express =require("express");
const Colors=require('@colors/colors');
require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');
const router = require("./routes/index.routes.js");
const { connectDB } = require("./config/dbConnetion.js");

const { schedule }  = require('node-cron');
const cron = require('node-cron');
const programedLogSend = require("./utils/programedLogSend.js");


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






