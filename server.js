"use strict";
const express = require("express");
const app = express();
const router = express.Router();
require("dotenv").config();

const { todaySnack } = require("./routes/index.js");
const { encrypt, decrypt } = require("./routes/cypher/index.js");

router.get("/", todaySnack);
router.get("/cypher/encrypt", encrypt);
router.get("/cypher/decrypt", decrypt);

app.use(router);

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
});
