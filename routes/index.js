const Sentry = require("@sentry/node");

const home = async (req, res) => {
  try {
    const headers = req.headers;
    Sentry.captureMessage(
      `Host: ${headers.host}, User agent: ${headers["user-agent"]}`,
      "log"
    );
    res.send({ headers });
  } catch (e) {
    Sentry.captureException(e);
  }
};

module.exports = { home };
