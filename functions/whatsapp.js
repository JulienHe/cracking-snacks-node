require("dotenv").config();
const client = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

function sendWhatsapp(theMessage) {
  client.messages
    .create({
      from: `whatsapp:${process.env.WHATSAPP_PHONE_NUMBER}`,
      body: theMessage,
      to: ["whatsapp:+14383417172"],
    })
    .then((message) => console.log(message.sid));
}

function sendWhatsappWithMedia(theMessage) {
  client.messages
    .create({
      mediaUrl: [
        "https://images.unsplash.com/photo-1545093149-618ce3bcf49d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
      ],
      body: theMessage,
      from: `whatsapp:${process.env.WHATSAPP_PHONE_NUMBER}`,
      to: ["whatsapp:+14383417172"],
    })
    .then((message) => console.log(message.sid));
}

module.exports = { sendWhatsapp, sendWhatsappWithMedia };
