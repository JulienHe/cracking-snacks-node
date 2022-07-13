const axios = require("axios");
const { getToday } = require("../functions/date");

const getTodaySnack = async () => {
  const getPublication = JSON.stringify({
    query: `query getSnacks($date: Date) {
              snacks(publicationState: PREVIEW, filters: { publish_at: { eq: $date } }) {
                  data {
                      id
                  }
              }
          }`,
    variables: { date: getToday() },
  });

  const configGetPublication = {
    method: "post",
    url: `${process.env.GRAPHQL_API_URL}`,
    headers: {
      "Content-Type": "application/json",
    },
    data: getPublication,
  };

  const resp = await axios(configGetPublication);

  return resp;
};

module.exports = { getTodaySnack };
