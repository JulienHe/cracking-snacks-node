const doppler = require("../doppler-widget.js");
require("dotenv").config();
const crypto = require("crypto-js");

async function encryptData(text) {
  const secrets = await doppler.getSecrets();
  const result = crypto.AES.encrypt(text, secrets.KEY_WHATSAPP_CRYPTO);
  return result.toString();
}

async function decryptData(text) {
  const secrets = await doppler.getSecrets();
  const result = crypto.AES.decrypt(text, secrets.KEY_WHATSAPP_CRYPTO);
  return result.toString(crypto.enc.Utf8);
}

module.exports = { encryptData, decryptData };
