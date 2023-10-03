// import {
//   EncryptInterData,
//   DecryptInterData,
// } from "../utils/encryptionInternal.js";
// import {
//   encryptableData,
//   dataDecryptation,
// } from "../utils/encryptionMarket.js";
// import {purchaseDataInfo, getDataInvoice} from "../utils/purchaseData.js";
const {
  EncryptInterData,
  DecryptInterData,
}=require("../utils/encryptionInternal.js");
const {
  encryptableData,
  dataDecryptation,
} =require("../utils/encryptionMarket.js");
const {purchaseDataInfo, getDataInvoice}=require("../utils/purchaseData.js");


const encryptDataService = async (data) => {
  let arrayProducts = [];
  for (let i = 0; i < data.length; i++) {
    let decrypt = await DecryptInterData(data[i]);

    arrayProducts.push(decrypt);
  }

  let dataSale = [];
  let dataBank = [];
  for(let i = 0; i < arrayProducts.length; i++){
    if(arrayProducts[i].hasOwnProperty( 'clearMessage' )){
      dataSale.push({sale: arrayProducts[i].clearMessage, shopCart: arrayProducts[i].shopCart});
      dataBank.push(arrayProducts[i].clearMessage)
    }
  }
  // console.log('el objecto>>>>>', getDataInvoice())
  purchaseDataInfo(dataSale, arrayProducts[0].customerData, arrayProducts[0].userSessionPlain)
  let arrayEncryptBank = [];
  for (let i = 0; i < dataBank.length; i++) {
    arrayEncryptBank.push(
      await encryptableData(JSON.stringify(dataBank[i]))
    );
  }
  // let encryptMarket = await encryptableData(JSON.stringify(decrypt))

  return arrayEncryptBank;
};

const decryptDataService = async (userData, sessionID) => {
  let data = await dataDecryptation(userData);

  let dataSplit = data.replace(/["{}]/g, "").split(",");
  let dataUser = {};
  for (let i = 0; i < dataSplit.length; i++) {
    let [key, value] = dataSplit[i].split(":");
    key = key.trim();
    value = value.trim();

    dataUser[key] = value;
  }
  dataUser["sessionID"] = sessionID;

  let encrypt = EncryptInterData(dataUser);

  return encrypt;
};

// export { encryptDataService, decryptDataService };
module.exports = { encryptDataService, decryptDataService };
