import SiBApi from "sib-api-v3-sdk";

async function sendEmail(data) {
  try {
    let email = process.env.CEBA_TARGET_EMAIL;
    const SibClient = SiBApi.ApiClient.instance;
    SibClient.authentications["api-key"].apiKey = process.env.BREVO_API_PASS;

    const transactionEmailApi = new SiBApi.TransactionalEmailsApi();
    let smtpMailData = new SiBApi.SendSmtpEmail();

    const sender = {
      email: "developmentmarketplace1@gmail.com",
      name: "CEBA API",
    };

    let productsArray = data.dataSale;
    let finalData = "";
    const row = productsArray.forEach((item) => {
      finalData += `<p><b>SKU Producto:</b> ${item.shopCart.sku}</p>                    
                        <p><b>Nombre Producto:</b> ${item.shopCart.productName}</p>  
                         <p><b>Cantidad Producto:</b> ${item.shopCart.preBooking}  <b>Precio Unitario:</b> $${item.shopCart.price}</p>                                                                
                         <p><b>Valor Compra Productos:</b> $${item.sale.amount} </p>                                                                
                         <hr>
                        `;
    });
    smtpMailData.sender = sender;
    smtpMailData.to = [
      {
        email,
      },
    ];
    smtpMailData.subject = `Transacción aprobada por el Banco No. ${data.saleCode} `;
    smtpMailData.htmlContent = `<html><body>
                <hr>
                <h3><b>SaleCode:</b> ${data.saleCode}</h3>
                <p><b>Authorization Code:</b> ${data.authorization_code}</p>
                <p><b>Transaction Code:</b> ${data.transaction_code}</p>
                <p><b>Transaction Date:</b> ${data.transaction_date}</p>
                <p><b>Paid Status:</b> ${data.paid_status}</p>
                <hr>
                <h3> Datos de Envio de Productos:  </h3>
                <hr>
                <p><b>Apellido:</b> ${data.customerData.lastName} <b>Nombre:</b> ${data.customerData.name}</p>
                <p><b>Direccion:</b> ${data.customerData.address}</p>
                <p><b>Departamento:</b> ${data.customerData.department} <b>Ciudad:</b> ${data.customerData.city} </p>
                <p><b>Teléfono:</b> ${data.customerData.phone} <b>@mail:</b> ${data.customerData.email}</p>
                <p><b>Observaciones:</b> ${data.customerData.reference}</p>
                <hr>
                <h3> Datos del Comprador: </h3>
                <hr>
                <p><b>Nombre:</b>${data.userSession.name}</p>
                <p><b>Tipo de Documento:</b>${data.userSession.documentType} <b>Número de Documento:</b>${data.userSession.documentNumber}</p>
                <p><b>@mail</b>${data.userSession.email} <b>Teléfono:</b>${data.userSession.cellPhone}</p>
                <b><hr></b>
                <hr>
                <h3> Productos adquiridos por el cliente:</h3>
                <hr>
                ${finalData}
            </body>
        </html>`;

    let result;
    await transactionEmailApi
      .sendTransacEmail(smtpMailData)
      .then((response) => {
        result = 200;
      })
      .catch((error) => {
        result = 500;
      });
    return result;
  } catch (e) {
    return e;
  }
}

export { sendEmail };
