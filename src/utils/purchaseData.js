import Sale from "../models/Sale.model.js";
import Colors from '@colors/colors';


const purchaseDataInfo = async (dataSale, customerData, userSession) => {

  try {
    let data = {
      saleCode: dataSale[0].sale.saleCode,
      dataSale,
      customerData,
      userSession
    }

    const result = await Sale.create(data);
  } catch (error) {
    console.log(Colors.bgBrightRed.black(`** Error: ${error.message} **`));
  }

}


const getDataInvoice = async (saleCode) => {

  try {
    const data = await Sale.find({saleCode});
    return data;
  } catch (error) {
    console.log(Colors.bgBrightRed.black(`** Error: ${error.message} **`));
  }
}







const updateDataInvoice = async (saleCode, data) => {
try {
    if((Object.getOwnPropertyNames(data).length)!=6) return 900 ; //no es un objeto o no tiene todos los keys
    let result = await Sale.updateOne({
      saleCode: saleCode},
      { $set: {
        readytoSend: data.readytoSend,
        paid_status: data.paid_status,
        authorization_code: data.authorization_code,
        transaction_code: data.transaction_code,
        transaction_date: data.transaction_date,
        error: data.error,
        }
      }, {new: true})
      return result;
  } catch (error) {
    console.log(Colors.bgBrightRed.black(`** Error: ${error.message} **`));
    return  error;
  }
}





const updateFlagInvoice = async (saleCode,flag) => {
try {
    if (!flag || (flag!=='ReadyToMail' && flag!=='MailSendeToCEBA')) return 900;
    const result = await Sale.updateOne({
      saleCode: saleCode},
      { $set: {
        readytoSend: flag,

        }
      }, {new: true})
    
      return result
  } catch (error) {
    console.log(Colors.bgBrightRed.black(`** Error: ${error.message} **`));
    return 900
  }
}




export {
  purchaseDataInfo,
  getDataInvoice,
  updateDataInvoice,
  updateFlagInvoice,
};
