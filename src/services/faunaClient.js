import { Client } from "fauna";

const client = new Client({
  secret: process.env.REACT_APP_AURALIA_FAUNA_SECRET,
  endpoint: new URL("https://db.eu.fauna.com"),
});

console.log(
  "Fauna client initialized with secret:",
  process.env.REACT_APP_AURALIA_FAUNA_SECRET ? "Set" : "Not set"
);

export default client;
