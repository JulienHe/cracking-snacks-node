require("dotenv").config();
const client = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

function sendWhatsapp(theMessage, mediaUrl = null, phone = null) {
  const whatsappContent = {};
  whatsappContent.from = `whatsapp:${process.env.WHATSAPP_PHONE_NUMBER}`;
  whatsappContent.to = [`whatsapp:+${phone}`];
  whatsappContent.body = theMessage;
  if (mediaUrl) {
    whatsappContent.mediaUrl = mediaUrl;
  }
  client.messages
    .create(whatsappContent)
    .then((message) => console.log(message.sid));
}

module.exports = { sendWhatsapp };
