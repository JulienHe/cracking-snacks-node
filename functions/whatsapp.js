require("dotenv").config();

const secrets = JSON.parse(
  require("child_process").execSync("node ./doppler-widget.js")
);

const client = require("twilio")(
  secrets.TWILIO_ACCOUNT_SID,
  secrets.TWILIO_AUTH_TOKEN
);

function sendWhatsapp(theMessage, mediaUrl = null, phone = null) {
  const whatsappContent = {};
  whatsappContent.from = `whatsapp:${secrets.WHATSAPP_PHONE_NUMBER}`;
  whatsappContent.to = [`${phone}`];
  whatsappContent.body = theMessage;
  if (mediaUrl) {
    whatsappContent.mediaUrl = mediaUrl;
  }
  client.messages
    .create(whatsappContent)
    .then((message) => console.log(message.sid));
}

module.exports = { sendWhatsapp };
