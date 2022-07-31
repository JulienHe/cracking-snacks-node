const axios = require("axios");

const updateTodaySnack = async (id) => {
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
    url: `${process.env.GRAPHQL_API_URL}`,
    headers: {
      Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
      "Content-Type": "application/json",
    },
    data: postPublication,
  };

  const resp = await axios(configUpdatePublication);

  return resp;
};

module.exports = { updateTodaySnack };
