// import { webcrypto } from "node:crypto";
const { webcrypto }=require("node:crypto");


const { subtle } = webcrypto;

const {SALT_MARKET, KEY_MARKET} = process.env;
const iv = new Uint8Array(16); // IV de 16 bytes

async function createKey() {

  try {



      const KEY = KEY_MARKET; // Replace with your key

      const SALT = SALT_MARKET; // Replace with your salt


      const secretKey = await subtle.importKey(

          "raw",

          KEY,

          { name: "PBKDF2" },

          false,

          ["deriveKey"]

      );


      const derivedKey = await subtle.deriveKey(

          {

              name: "PBKDF2",

              salt: SALT,

              iterations: 65536,

              hash: "SHA-512",

          },

          secretKey,

          { name: "AES-GCM", length: 256 },

          false,

          ["encrypt", "decrypt"]

      );

      return derivedKey;


  } catch (e) {

      console.error(e.message);

      return null;

  }

}




// **********************************************************************************************************



async function encryptableData(payload) {
  try {
    const keyPromise = createKey();
    const ivParameterspec = new Uint8Array(iv);
    let dataEncrypt;

    const key = await keyPromise;
    const algorithm = {
      name: "AES-GCM",
      iv: ivParameterspec,
    };

    dataEncrypt = await subtle.encrypt(algorithm, key, new TextEncoder().encode(payload));
    return btoa(String.fromCharCode(...new Uint8Array(dataEncrypt)));

  } catch (e) {
    console.error(e.message);
  }
}




// ***********************************************************************************************************

async function dataDecryptation(encryptedData) {

  try {

      const key = await createKey();

      const ivParameterspec = iv;


      const algorithm = {

          name: "AES-GCM",

          iv: ivParameterspec,

      };


      const encryptedArray = new Uint8Array(atob(encryptedData).split('').map(char => char.charCodeAt(0)));

      const decrypted = await subtle.decrypt(algorithm, key, encryptedArray);

      const decryptedText = new TextDecoder().decode(decrypted);

      return  decryptedText;


  } catch (e) {

      console.error('Error:', e.message);

      return null;

  }

}


module.exports={dataDecryptation,encryptableData,createKey}




