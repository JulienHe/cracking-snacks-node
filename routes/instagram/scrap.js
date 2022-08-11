const axios = require("axios");

const getTodayPost = async (req, res) => {
  let config = {
    method: "get",
    url: "https://v1.nocodeapi.com/crackingsnacks/instagram/FKbqtFHuzwUholYg",
    params: {},
  };

  const resp = await axios(config)
    .then((response) => {
      const result = response.data.data[0];
      const caption = result.caption;
      const permalink = result.permalink;
      const timestamp = result.timestamp;
      return { caption, permalink, timestamp };
    })
    .catch((error) => {
      console.log(error);
    });

  return resp;
};

module.exports = { getTodayPost };
