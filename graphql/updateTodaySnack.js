const doppler = require("../doppler-widget.js");
const axios = require("axios");

const updateTodaySnack = async (id, instagram_permalink) => {
  const secrets = await doppler.getSecrets();
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
    variables: {
      data: {
        publishedAt: `${today.toISOString()}`,
        instagram_post: `${instagram_permalink}`,
      },
      id: `${id}`,
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

module.exports = { updateTodaySnack };
