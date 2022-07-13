"use strict";
const express = require("express");
const app = express();
require("dotenv").config();

const { sendWhatsapp, sendWhatsappWithMedia } = require("./functions/whatsapp");
const { getTodaySnack } = require("./graphql/getTodaySnack");
const { updateTodaySnack } = require("./graphql/updateTodaySnack");

app.get("/", (req, res) => {
  const checkTodaySnack = async () => {
    try {
      const resp = await getTodaySnack();
      if (resp.data.data.snacks.data.length > 0) {
        try {
          const respUpdate = await updateTodaySnack(
            resp.data.data.snacks.data[0].id
          );
          if (respUpdate.data.data.updateSnack) {
            const snack = respUpdate.data.data.updateSnack.data.attributes;
            sendWhatsapp(`🍿A new snack review is available! 🍿

${snack.Name} is now visible on the website.
Do you know this one 👀?
Visit https://crackingsnacks.com/snack/${snack.Slug} to check it out!
              
We wish a good snacking today ❤️!`);
            console.log(respUpdate.data);
          } else {
            sendWhatsapp(`The snack with the ID ${id} did not get published!`);
            console.log(`The snack with the ID ${id} did not get published!`);
          }
        } catch (err) {
          console.error(err);
          res.send(err);
        }
      } else {
        sendWhatsapp(`No new snack to be published today! 🙈
See you later 🤩!`);
      }
    } catch (err) {
      console.log(err);
      res.send(JSON.stringify(err));
    }
  };
  checkTodaySnack();

  res.send(`Hello hello!`);
});

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 4343;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
