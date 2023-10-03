// import CryptoJS from 'crypto-js';
const CryptoJS=require('crypto-js');

let key = process.env.KEY_PASS_INTERNAL;

function EncryptInterData(param){

  const textEncrypt = CryptoJS.AES.encrypt(JSON.stringify(param), key).toString()
  return textEncrypt;


};


function DecryptInterData(param){


  let decryptedObject = JSON.parse(CryptoJS.AES.decrypt(param,key).toString(CryptoJS.enc.Utf8))
  return decryptedObject;


};


module.exports = {DecryptInterData,EncryptInterData};