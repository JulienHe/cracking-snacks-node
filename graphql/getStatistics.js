const doppler = require("../doppler-widget.js");
const axios = require("axios");

const getStatistics = async () => {
  const secrets = await doppler.getSecrets();
  const dataConfig = JSON.stringify({
    query: `query getStatistics {
      statistic {
        data {
          id
          attributes {
            snacksEaten
            caloriesEaten
          }
        }
      }
    }`,
  });

  const configGetStatistics = {
    method: "post",
    url: `${secrets.GRAPHQL_API_URL}`,
    headers: {
      "Content-Type": "application/json",
    },
    data: dataConfig,
  };

  const resp = await axios(configGetStatistics);

  return resp;
};

module.exports = { getStatistics };
