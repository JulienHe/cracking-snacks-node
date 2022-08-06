const doppler = require("../doppler-widget.js");
const axios = require("axios");

const updateTodaySnack = async (id) => {
  const secrets = await doppler.getSecrets();
  console.log(secrets);
  const today = new Date();
  const postPublication = JSON.stringify({
    query: `mutation updatePublicationState($id: ID!, $data: SnackInput!) {
            updateSnack(id: $id, data: $data) {
                data {
                    attributes {
                        Name
                        publishedAt
                        Slug
                        whatsapp_cover {
                            data {
                                attributes {
                                    formats
                                }
                            }
                        }
                    }
                }
            }
        }`,
    variables: { data: { publishedAt: `${today.toISOString()}` }, id: `${id}` },
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

  console.log(configUpdatePublication);

  const resp = await axios(configUpdatePublication);

  console.log(resp.data.data.updateSnack);

  return resp;
};

module.exports = { updateTodaySnack };
