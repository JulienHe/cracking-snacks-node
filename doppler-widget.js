const https = require("https");

module.exports.getSecrets = async () => {
  return new Promise(function (resolve, reject) {
    https
      .get(
        `https://${process.env.DOPPLER_TOKEN}@api.doppler.com/v3/configs/config/secrets/download?format=json`,
        (res) => {
          let secrets = "";
          res.on("data", (data) => (secrets += data));
          res.on("end", () => resolve(JSON.parse(secrets)));
        }
      )
      .on("error", (e) => reject(e));
  });
};

// If executed as a script
if (require.main === module) {
  (async () => {
    const secrets = await this.getSecrets();
    process.stdout.write(JSON.stringify(secrets));
  })();
}
