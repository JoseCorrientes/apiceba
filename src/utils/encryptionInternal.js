import CryptoJS from 'crypto-js';

let key = process.env.KEY_PASS_INTERNAL;

export function EncryptInterData(param){

  const textEncrypt = CryptoJS.AES.encrypt(JSON.stringify(param), key).toString()
  return textEncrypt;


};


export function DecryptInterData(param){


  let decryptedObject = JSON.parse(CryptoJS.AES.decrypt(param,key).toString(CryptoJS.enc.Utf8))
  return decryptedObject;


};
