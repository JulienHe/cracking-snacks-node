const { sendWhatsapp } = require("../functions/whatsapp");
const { isToday } = require("../functions/date");
const { getTodaySnack } = require("../graphql/getTodaySnack");
const { getWhatsappPhones } = require("../graphql/getWhatsappNumber");
const { updateTodaySnack } = require("../graphql/updateTodaySnack");
const { decryptData } = require("../functions/cypher");
const { getTodayPost } = require("../routes/instagram/scrap");

const todaySnack = async (req, res) => {
  try {
    const resp = await getTodaySnack();
    const igpost = await getTodayPost().then((result) => {
      return result;
    });
    const phones = await getWhatsappPhones();
    const phonesArray = phones.data.data.whatsappPhones.data;
    if (resp.data.data.snacks.data.length > 0) {
      const todaySnack = resp.data.data.snacks.data[0];
      try {
        const respUpdate = await updateTodaySnack(
          todaySnack.id,
          igpost.permalink
        );
        const igPostSnackPostSameDay = isToday(
          todaySnack.attributes.publish_at,
          igpost.timestamp
        );
        const updatedTodaySnack =
          respUpdate.data.data.updateSnack.data.attributes ?? null;
        if (updatedTodaySnack && igPostSnackPostSameDay) {
          const images =
            updatedTodaySnack.whatsapp_cover.data.attributes.formats.large.url;
          phonesArray.forEach(async (element) => {
            const phone = await decryptData(element.attributes.PhoneNumber);
            sendWhatsapp(
              `🍿A new snack review is available! 🍿

${updatedTodaySnack.Name} is now visible on the website.
Do you know this one 👀?
Visit ${igpost.permalink} to check it out!

We wish a good snacking today ❤️!`,
              images,
              `whatsapp:+${phone}`
            );
          });
          if (res) {
            res.send("Message sent");
          } else {
            console.log("Message sent");
          }
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
