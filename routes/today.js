const { sendWhatsapp } = require("../functions/whatsapp");
const { getTodaySnack } = require("../graphql/getTodaySnack");
const { getWhatsappPhones } = require("../graphql/getWhatsappNumber");
const { updateTodaySnack } = require("../graphql/updateTodaySnack");
const { decryptData } = require("../functions/cypher");

const todaySnack = async (req, res) => {
  try {
    const resp = await getTodaySnack();
    const phones = await getWhatsappPhones();
    const phonesArray = phones.data.data.whatsappPhones.data;
    if (resp.data.data.snacks.data.length > 0) {
      try {
        const respUpdate = await updateTodaySnack(
          resp.data.data.snacks.data[0].id
        );
        if (respUpdate.data.data.updateSnack) {
          const snack = respUpdate.data.data.updateSnack.data.attributes;
          const images = snack.whatsapp_cover.data.attributes.formats.large.url;
          const url = req.query.igpost
            ? req.query.igpost
            : `https://crackingsnacks.com/snack/${snack.Slug}`;
          phonesArray.forEach(async (element) => {
            const phone = await decryptData(element.attributes.PhoneNumber);
            sendWhatsapp(
              `🍿A new snack review is available! 🍿

${snack.Name} is now visible on the website.
Do you know this one 👀?
Visit ${url} to check it out!
                
We wish a good snacking today ❤️!`,
              images,
              `whatsapp:+${phone}`
            );
          });
          res.send("Message sent");
        } else {
          sendWhatsapp(`The snack with the ID ${id} did not get published!`);
          res.send(`The snack with the ID ${id} did not get published!`);
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      sendWhatsapp(`No new snack to be published today! 🙈
See you later 🤩!`);
      res.send("No Snack today");
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { todaySnack };
