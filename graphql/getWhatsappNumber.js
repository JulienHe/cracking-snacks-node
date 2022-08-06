const doppler = require("../doppler-widget.js");
const axios = require("axios");
const { getToday } = require("../functions/date");

const getWhatsappPhones = async () => {
  const secrets = await doppler.getSecrets();
  const getPhones = JSON.stringify({
    query: `  query getWhatsappPhone {
      whatsappPhones(
        pagination: { page: 1, pageSize: 100 }
        sort: "createdAt:desc"
        filters: { Registered: { eq: true } }
        ) {
          data {
            attributes {
              Name
              Registered
              PhoneNumber
            }
          }
        }
      }`,
    variables: { date: getToday() },
  });

  const configGetPhones = {
    method: "post",
    url: `${secrets.GRAPHQL_API_URL}`,
    headers: {
      "Content-Type": "application/json",
    },
    data: getPhones,
  };

  const resp = await axios(configGetPhones);

  return resp;
};

module.exports = { getWhatsappPhones };
