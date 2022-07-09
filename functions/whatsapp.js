require("dotenv").config();
const client = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

function sendWhatsapp(theMessage) {
  client.messages
    .create({
      from: "whatsapp:+18023476225",
      body: theMessage,
      to: ["whatsapp:+14383417172"],
    })
    .then((message) => console.log(message.sid));
}

module.exports = { sendWhatsapp };
