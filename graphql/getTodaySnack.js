const doppler = require("../doppler-widget.js");
const axios = require("axios");
const { getToday } = require("../functions/date");

const getTodaySnack = async () => {
  const secrets = await doppler.getSecrets();
  const getPublication = JSON.stringify({
    query: `query getSnacks($date: Date) {
      snacks(publicationState: PREVIEW, filters: { publish_at: { eq: $date } }) {
        data {
          id
          attributes {
            Name
            publish_at
          }
        }
      }
    }`,
    variables: { date: getToday() },
  });

  const configGetPublication = {
    method: "post",
    url: `${secrets.GRAPHQL_API_URL}`,
    headers: {
      "Content-Type": "application/json",
    },
    data: getPublication,
  };

  const resp = await axios(configGetPublication);
  
  return resp;
};

module.exports = { getTodaySnack };
