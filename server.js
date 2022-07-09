'use strict';
const express = require('express');
const app = express();
const axios = require('axios');
require('dotenv').config()
const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

app.get('/', (req, res) => {
  const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();
  res.send(`${yyyy}-${mm}-${dd}`);
});

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 4343;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});