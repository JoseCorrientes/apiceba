import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { getAllLogsController } from "./programedLogSendController.js";
import { sendReportBank } from "./sendReportBank.js";

async function programedLogSend() {
  let logs = await getAllLogsController();
  if (logs == 404) {
    console.log(" como manejo datos vacios por posible error");
  }
  //manejar posible error, no se pudo enviar datos al correo de davivienda=> FUTURO PANEL DE NOTIFICACION

  let logsModified = logs.map((item) => {
    let [today, hour] = item.date.split(",");
    let [dayR, monthR, yearR] = today.split("/");
    let dateFinalString = `${dayR}/${monthR}/${yearR}, ${hour}`;
    return {
      _id: item._id,
      ip: item.ip,
      date: dateFinalString,
      sessionId: item.sessionId,
      component: item.component,
      status: item.status,
      description: item.description,
    };
  });

  const now = new Date();
  let year = now.getFullYear();
  let month = (now.getMonth() + 1).toString();
  if (month.length < 2) month = "0" + month;
  let day = now.getDate().toString();
  if (day.length < 2) day = "0" + day;
  let today = `${year}${month}${day}`;

  let titulo = [
    {
      content: `Logs CEBA ${day}-${month}-${year}`,
      styles: { halign: "center" },
    },
  ];
  let doc = new jsPDF();
  doc.autoTable({
    head: [titulo],
  });

  doc.autoTable({
    head: [
      [
        "Fecha",
        "Dirección IP",
        "I.D. Sesión",
        "Componente",
        "Estado",
        "Descripción",
      ],
    ],
    columns: [
      { dataKey: "date" },
      { dataKey: "ip" },
      { dataKey: "sessionId" },
      { dataKey: "component" },
      { dataKey: "status" },
      { dataKey: "description" },
    ],
    showHead: "firstPage",
    body: logsModified,

    headStyles: {
      fillColor: [255, 142, 4],
      fontSize: 10,
      halign: "center",
      fontStyle: "majalla",
    },
    bodyStyles: {
      fontSize: 8,
      fontStyle: "arial",
    },
  });

  doc.save(`reports/${today}-CEBA.pdf`);
  const result = await sendReportBank(today);
  if (result == 500) {
  } //manejar posible error, no se pudo enviar datos al correo de davivienda==> FUTURO PANEL DE NOTIFICACION
  console.log("resultado de sendREport");
  console.log(result);
}

export default programedLogSend;

// import {jsPDF} from 'jspdf'
// import 'jspdf-autotable'
// import { getAllLogsController } from './programedLogSendController.js'
// import { sendReportBank } from './sendReportBank.js'

// async function programedLogSend() {
//     let logs = await getAllLogsController()
//     if (logs==404) { console.log(' como manejo datos vacios por posible error')}
//     let logsModified = logs.map(item=> {
//             let [today, hour] = item.date.split(",")
//             let[dayR, monthR, yearR] = today.split('/');
//             let dateFinalString = `${dayR}/${monthR}/${yearR}, ${hour}`
//             return {
//                 _id: item._id,
//                 ip: item.ip,
//                 date: dateFinalString,
//                 sessionId: item.sessionId,
//                 component: item.component,
//                 status: item.status,
//                 description: item.description,
//             }
//     })

//     //si no hubo error en la recuperacion de logs:
//     const now = new Date()
//     let year = now.getFullYear();
//     let month= (now.getMonth()+1).toString();
//     if (month.length<2) month='0'+month
//     let day= (now.getDate()).toString();
//     if(day.length<2) day='0'+day
//     let today=`${year}${month}${day}`

//     let titulo = [{content:`Logs CEBA ${day}-${month}-${year}`, styles: {halign: 'center'}}]
//         let doc = new jsPDF()
//         doc.autoTable({
//             head: [titulo],
//         })

//         doc.autoTable({
//         columns: [
//             {header: 'FECHA', dataKey: 'date'},
//             {header: 'IP', dataKey: 'ip'},
//             {header: 'I.D. SESION', dataKey: 'sessionId'},
//             {header: 'COMPONENTE', dataKey: 'component'},
//             {header: 'ESTADO', dataKey: 'status'},
//             {header: 'DESCRIPCION', dataKey: 'description'},
//         ],
//         body: logsModified,
//         headStyles: {
//             fillColor: [ 255,142,4],
//             fontSize: 10,
//             halign: 'center',
//             fontStyle: 'majalla'
//         },
//         bodyStyles: {
//             fontSize: 8,
//             fontStyle: 'arial',
//         }
//         })

//         doc.save(`reports/${today}-CEBA.pdf`)
//         const result = await sendReportBank(today)
//         if (result==500){}   //manejar posible error, no se pudo enviar datos al correo de davivienda
//         console.log('resultado de sendREport')
//         console.log(result)
// }

// export default programedLogSend
