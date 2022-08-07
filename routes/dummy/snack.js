const { sendWhatsapp } = require("../../functions/whatsapp");

const snackWithMedia = async (req, res) => {
  try {
    sendWhatsapp(
      `🍿A new snack review is available! 🍿

SNACK_NAME is now visible on the website.
Do you know this one 👀?
Visit THE_URL to check it out!
          
We wish a good snacking today ❤️!`,
      "https://assets.crackingsnacks.com/whatsapp_rap_snacks_cardi_b_2_a10ef8dfed/whatsapp_rap_snacks_cardi_b_2_a10ef8dfed.jpg?updated_at=2022-08-01T16:14:11.177Z",
      "whatsapp:14383417172"
    );
  } catch (err) {
    console.log(err);
  }
  res.send("Message sent");
};

module.exports = { snackWithMedia };
