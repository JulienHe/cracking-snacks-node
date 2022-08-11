"use strict";
const express = require("express");
const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");
const app = express();
const router = express.Router();
require("dotenv").config();

const { home } = require("./routes/index.js");
const { todaySnack } = require("./routes/today.js");
const { snackWithMedia } = require("./routes/dummy/snack.js");
const { getTodayPost } = require("./routes/instagram/scrap.js");
const { whatsAppReply } = require("./routes/whatsapp/conversation.js");
const { encrypt, decrypt } = require("./routes/cypher/index.js");

router.get("/", home);
router.get("/todaySnack", todaySnack);
router.get("/dummy/snack", snackWithMedia);
router.get("/instagram/scrap", getTodayPost);
router.get("/whatsapp/conversation", whatsAppReply);
router.get("/cypher/encrypt", encrypt);
router.get("/cypher/decrypt", decrypt);
router.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

Sentry.init({
  dsn: "https://4cd2875e295045649e9daadd2801da87@o1350322.ingest.sentry.io/6630097",
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app }),
  ],
  environment: process.env.NODE_ENV,

  tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(router);

app.use(Sentry.Handlers.errorHandler());

app.use(function onError(err, req, res, next) {
  res.statusCode = 500;
  res.end(res.sentry + "\n");
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
});
