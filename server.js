"use strict";
const express = require("express");
const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");
const app = express();
const router = express.Router();
require("dotenv").config();

const { todaySnack } = require("./routes/index.js");
const { encrypt, decrypt } = require("./routes/cypher/index.js");

router.get("/", todaySnack);
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

  tracesSampleRate: 1.0,
});

console.log(process.env.NODE_ENV);

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
