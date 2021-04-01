require("dotenv").config();

module.exports = {
  apiPort: 3000,
  database: {
    url: "127.0.0.1:27017",
    name: "marvel",
  },
  marvel: {
    public_key: process.env.PUBLIC_KEY,
    private_key: process.env.PRIVATE_KEY,
    base_url: "https://gateway.marvel.com",
    character_url: "/v1/public/characters",
    limit: 100,
  },
  oauth: {
    client_id: process.env.CLIENT_ID,
    client_server: process.env.CLIENT_SERVER,
  },
};
