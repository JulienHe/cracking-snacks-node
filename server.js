"use strict";
const express = require("express");
const app = express();
require("dotenv").config();

const { sendWhatsapp } = require("./functions/whatsapp");
const { getTodaySnack } = require("./graphql/getTodaySnack");
const { getWhatsappPhones } = require("./graphql/getWhatsappNumber");
const { updateTodaySnack } = require("./graphql/updateTodaySnack");
const { encrypt, decrypt } = require("./functions/cypher");

app.get("/", (req, res) => {
  const checkTodaySnack = async () => {
    try {
      const resp = await getTodaySnack();
      const phones = await getWhatsappPhones();
      console.log(phones.data.data.whatsappPhones.data);
      if (resp.data.data.snacks.data.length > 0) {
        try {
          const respUpdate = await updateTodaySnack(
            resp.data.data.snacks.data[0].id
          );
          if (respUpdate.data.data.updateSnack) {
            const snack = respUpdate.data.data.updateSnack.data.attributes;
            const images =
              snack.whatsapp_cover.data.attributes.formats.large.url;
            const url = req.query.igpost
              ? req.query.igpost
              : `https://crackingsnacks.com/snack/${snack.Slug}`;
            sendWhatsapp(
              `🍿A new snack review is available! 🍿

${snack.Name} is now visible on the website.
Do you know this one 👀?
Visit ${url} to check it out!
              
We wish a good snacking today ❤️!`,
              images
            );
            console.log(respUpdate.data);
          } else {
            sendWhatsapp(`The snack with the ID ${id} did not get published!`);
            console.log(`The snack with the ID ${id} did not get published!`);
          }
        } catch (err) {
          console.error(err);
        }
      } else {
        sendWhatsapp(`No new snack to be published today! 🙈
See you later 🤩!`);
      }
    } catch (err) {
      console.log(err);
    }
  };
  checkTodaySnack();

  res.send(`Hello hello!`);
});

app.get("/cypher/encrypt", (req, res) => {
  res.send(encrypt(req.query.phone));
});

app.get("/cypher/decrypt", (req, res) => {
  res.send(decrypt(req.query.phone));
});

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 4343;
app.listen(PORT, () => {
  console.log(
    `  .aMMMb  dMMMMb  .aMMMb  .aMMMb  dMP dMP dMP dMMMMb  .aMMMMP        .dMMMb  dMMMMb  .aMMMb  .aMMMb  dMP dMP .dMMMb `
  );
  console.log(
    `  dMP"VMP dMP.dMP dMP"dMP dMP"VMP dMP.dMP amr dMP dMP dMP"           dMP" VP dMP dMP dMP"dMP dMP"VMP dMP.dMP dMP" VP `
  );
  console.log(
    ` dMP     dMMMMK" dMMMMMP dMP     dMMMMK" dMP dMP dMP dMP MMP"        VMMMb  dMP dMP dMMMMMP dMP     dMMMMK"  VMMMb   `
  );
  console.log(
    `dMP.aMP dMP"AMF dMP dMP dMP.aMP dMP"AMF dMP dMP dMP dMP.dMP        dP .dMP dMP dMP dMP dMP dMP.aMP dMP"AMF dP .dMP   `
  );
  console.log(
    `VMMMP" dMP dMP dMP dMP  VMMMP" dMP dMP dMP dMP dMP  VMMMP"         VMMMP" dMP dMP dMP dMP  VMMMP" dMP dMP  VMMMP"    `
  );
  console.log(`Server listening on port ${PORT}...`);
  console.log(process.env);
});
