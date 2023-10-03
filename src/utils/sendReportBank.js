import SiBApi from "sib-api-v3-sdk";
import pdfToBase64 from "pdf-to-base64";

async function sendReportBank(today) {
  
  try {
    let toSendFile;
    await pdfToBase64(`reports/${today}-CEBA.pdf`)
        .then(response=> { toSendFile=response })

        .catch(response => console.log('no se recibio archivo'))  // ver como manejar error no lee el archivo y por lo tanto no se puede enviar. POSIBLEMENTE GRABAR LOG?








    let email = process.env.CEBA_TARGET_EMAIL;
    const SibClient = SiBApi.ApiClient.instance;
    SibClient.authentications["api-key"].apiKey = process.env.BREVO_API_PASS;

    const transactionEmailApi = new SiBApi.TransactionalEmailsApi();
    let smtpMailData = new SiBApi.SendSmtpEmail();

    let todayYear = today.slice(0,4);
    let todayMonth = today.slice(4,6);
    let todayDay = today.slice(6);

    const sender = {
      email: "developmentmarketplace1@gmail.com",
      name: "CEBA API",
    };
    smtpMailData.sender = sender;
    smtpMailData.to = [
      {
        email,
      },
    ];
    smtpMailData.subject = `Envio de logs App CEBA/DAVIVIENDA ${todayDay}/${todayMonth}/${todayYear}`;
    smtpMailData.htmlContent = `<html><body>
                <hr>
                <h1>Estimados CEBA</h1>
                <p>Adjuntamos informe de Logs de la App Marketplace en DAVIVIENDA correspondiente al ${todayDay}/${todayMonth}/${todayYear}</p>
                <p>Saludos</p>
                <hr>
                <p>email automático generaldo por CEBA API - No responder</p>
                <hr>
            </body>
        </html>`;

    smtpMailData.sender   
    smtpMailData.attachment=[
        {
        content: toSendFile,
        name: `${today}-CEBA.pdf`
    }]
    let result;
    await transactionEmailApi
      .sendTransacEmail(smtpMailData)
      .then((response) => {
        result = 200;
      })
      .catch((error) => {
        // ver como manejar error no se pudo enviar el correo a DAVIVIENDA POSIBLEMENTE GRABAR LOG?
        result = 500;
      });
    return result;
  } catch (e) {
    return e;
  }
}

export { sendReportBank };
