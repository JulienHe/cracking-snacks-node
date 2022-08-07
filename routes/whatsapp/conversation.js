const { sendWhatsapp } = require("../../functions/whatsapp");

const whatsAppReply = async (req, res) => {
  console.log(req.query);
  const {
    SmsMessageSid,
    NumMedia,
    ProfileName,
    SmsSid,
    WaId,
    SmsStatus,
    Body,
    ButtonText,
    To,
    ButtonPayload,
    MessagingServiceSid,
    NumSegments,
    ReferralNumMedia,
    MessageSid,
    From,
  } = req.query;

  if (ButtonPayload) {
    switch (ButtonPayload) {
      case "Never-saw-this-one!-Payload":
        sendWhatsapp(
          `Woop woop ${ProfileName}!
I'm so glad that you did not know this one 🥺.

I hope I can make you discover more snacks later 🔥!`,
          null,
          From
        );
        break;
      case "I-know-this-one!-Payload":
        sendWhatsapp(
          `Oooooooh I see ${ProfileName}!
        
You already know that one!
Do you think that we have the same opinion??`,
          null,
          From
        );
        break;
      case "Yes,-we-do!!!-Payload":
        sendWhatsapp(
          `High-five 🙌!
So glad we have the same taste for this one ❤️!

Have a great day 🔥.`,
          null,
          From
        );
        break;
      case "Nope-nope.-Payload":
        sendWhatsapp(
          `😅 It's embarrassing!

We all have different taste 🫢.
I hope we will like the same snacks in the future 🥺.`,
          null,
          From
        );
        break;

      default:
        console.log("Nothing");
        break;
    }
  } else {
    sendWhatsapp(
      `Thank you ${ProfileName} for your message 🙃!
I'm not a real artificial intelligence 🤖, yet.

I'll do my best in the future to reply well 🤩😤!`,
      null,
      From
    );
  }

  res.send("Conversation");
};

module.exports = { whatsAppReply };
