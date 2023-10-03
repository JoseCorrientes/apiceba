// import Colors from "@colors/colors";
// import { paymentService } from "../services/payment.services.js";
// import { updateSaleFlag, emailStatus } from "../services/sale.services.js";
// import { createLogsService } from "../services/logs.services.js";
// import { sendEmail } from "../utils/sendEmail.js";
// import { getDataInvoice } from "../utils/purchaseData.js";
const Colors = require("@colors/colors");
const { paymentService } =require("../services/payment.services.js");
const { updateSaleFlag, emailStatus }=require("../services/sale.services.js");
const { createLogsService } =require("../services/logs.services.js");
const { sendEmail }=require("../utils/sendEmail.js");
const { getDataInvoice } =require("../utils/purchaseData.js");








const paymentConfirmation = async (req, res) => {
  try {
    let data = req.body;

    //1)
    //   GRABO EN LA TABLA PAYMENT
    // si no puede grabar se ignora solamente no se maneja errores
    const result = await paymentService(req.body);

    //2)
    //    GRABO EN LA TABLA SALES
    const data1 = {
      readytoSend: req.body.paid_status == "Ok" ? "ReadyToMail" : "pending",
      paid_status: req.body.paid_status,
      authorization_code: req.body.authorization_code,
      transaction_code: req.body.transaction_code,
      transaction_date: req.body.transaction_date,
      error: req.body.error,
    };

    const result2 = await updateSaleFlag(req.body.reference, data1);
    //result2 tenemos 200 si se actualizo un cambo de referencia
    //                404 no se pudo actualizar porque no hay correspondencia con la referencia
    //                900 no se actualizo (dio un error) se paso un elemento distinto a un objeto o no tiene 6 keys el objeto

    if (result2 == 404) {
      // sale manejo porque no se pudo actualizar porque no existe la
      let info = {
        ip: "Uso interno",
        date: new Date().toLocaleString(),
        sessionId: `SaleReference ${req.body.reference}`,
        component: "Backend EndPoint Bank - Update Sales data from Bank",
        status: "Error",
        description: `Reference didn't founded in Sales Table`,
      };
      const result4 = await createLogsService(info);
      return res
        .status(500)
        .json({
          status: "Error",
          message:
            "Reference didn't found - Sales wasn't updated with data to API from DAVIVIENDA",
        });
    }
    if (result2 == 900) {
      // sale manejo porque no se pudo actualizar porque dio error}
      let info = {
        ip: "Uso interno",
        date: new Date().toLocaleString(),
        sessionId: `SaleReference ${req.body.reference}`,
        component: "Backend EndPoint Bank - Update Sales data from Bank",
        status: "Error",
        description: `Error updating Sales Table`,
      };
      const result4 = await createLogsService(info);
      return res
        .status(500)
        .json({
          status: "Error",
          message:
            "Server Error - Sales wasn't updated with data to API from DAVIVIENDA",
        });
    }

    //3)   GRABAR UNA ENTRADA EN LOGS  CON LA AUTORIZACION DE DAVIVIENDA
    //no manejamos errores asumimios que siempre graba el log
    let info = {
      ip: "Uso interno",
      date: new Date().toLocaleString(),
      sessionId: `SaleReference ${req.body.reference}`,
      component: "Backend EndPoint Bank",
      status: "Ok",
      description: `Status: ${req.body.paid_status} - Ref: ${req.body.reference} - Authorization: ${req.body.authorization_code} - Transaction: ${req.body.transaction_code} - Trans. Date: ${req.body.transaction_date} - message: ${req.body.error}`,
    };
    const result4 = await createLogsService(info);

    //4) Enviar el correa a CEBA de los productos a entregar
    let result5 = await getDataInvoice(req.body.reference);
    let result6 = await sendEmail(result5[0]);
    if (result6 == 500) {
      console.log("Error interno al enviar correo a CEBA ver que hacer");
      let info = {
        ip: "Uso interno",
        date: new Date().toLocaleString(),
        sessionId: `SaleReference ${req.body.reference}`,
        component: "Send email to CEBA",
        status: "Error",
        description: `Error - Mail to CEBA wasn't sended - Reference: ${req.body.reference}`,
      };
      const result14 = await createLogsService(info);
      return res
        .status(500)
        .json({
          status: "Error",
          message: "Error - Mail to CEBA wasn't sended",
        });
    }

    //5) Actualizar en Sales el campo "readyToSend" a "MailSendeToCEBA"
    let result7 = await emailStatus(req.body.reference, "MailSendeToCEBA");

    console.log(`resultado de result 7: ${result7}`);

    if (result7 == 404) {
      // sale manejo porque no se pudo actualizar porque no existe la
      let info = {
        ip: "Uso interno",
        date: new Date().toLocaleString(),
        sessionId: `SaleReference ${req.body.reference}`,
        component: "Backend EndPoint Bank",
        status: "Error",
        description: `Error - Update readyToSend to MailSendeToCEBA on Sales`,
      };
      const result24 = await createLogsService(info);
      return res
        .status(500)
        .json({
          status: "Reference Error",
          message:
            "Reference didn't found - Sales wasn't updated on readyToSend to MailSendeToCEBA",
        });
    }
    if (result7 == 900) {
      // sale manejo porque no se pudo actualizar porque no existe la
      let info = {
        ip: "Uso interno",
        date: new Date().toLocaleString(),
        sessionId: `SaleReference ${req.body.reference}`,
        component: "Backend EndPoint Bank",
        status: "Error",
        description: `Server Error - Update readyToSend to MailSendeToCEBA on Sales`,
      };
      const result24 = await createLogsService(info);
      return res
        .status(500)
        .json({
          status: "Error",
          message:
            "Server Error - Sales wasn't updated on readyToSend to MailSendeToCEBA",
        });
    }

    info = {
      ip: "Uso interno",
      date: new Date().toLocaleString(),
      sessionId: `SaleReference ${req.body.reference}`,
      component: "Backend EndPoint Bank",
      status: "Ok",
      description: `Sales Updated Ok - Process was finished`,
    };
    const result24 = await createLogsService(info);
    return res
      .status(500)
      .json({
        status: "Ok",
        message: "Sales Updated Ok - Process was finished",
      });
    // funcion actualizar stock (preebooking y stock)
  } catch (error) {
    console.log(Colors.bgBrightRed.black(`** Error: ${error.message} **`));
    return res
      .status(500)
      .json({ message: "Internal server error", Error: error.message });
  }
};

// export { paymentConfirmation };
module.exports = { paymentConfirmation };

