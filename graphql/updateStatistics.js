const doppler = require("../doppler-widget.js");
const axios = require("axios");

const updateStatistics = async (snacksEaten, caloriesEaten) => {
  const secrets = await doppler.getSecrets();
  const postPublication = JSON.stringify({
    query: `mutation updateStock($data: StatisticInput!) {
      updateStatistic(data: $data) {
        data {
          attributes {
            snacksEaten
            caloriesEaten
          }
        }
      }
    }`,
    variables: {
      data: { snacksEaten: snacksEaten, caloriesEaten: caloriesEaten },
    },
  });

  const configUpdatePublication = {
    method: "post",
    url: `${secrets.GRAPHQL_API_URL}`,
    headers: {
      Authorization: `Bearer ${secrets.BEARER_TOKEN}`,
      "Content-Type": "application/json",
    },
    data: postPublication,
  };

  const resp = await axios(configUpdatePublication);

  return resp;
};

module.exports = { updateStatistics };
