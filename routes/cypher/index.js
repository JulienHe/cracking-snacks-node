const { encryptData, decryptData } = require("../../functions/cypher.js");

const encrypt = async (req, res) => {
  res.send(await encryptData(req.query.phone));
};

const decrypt = async (req, res) => {
  res.send(await decryptData(req.query.phone));
};

module.exports = { encrypt, decrypt };
