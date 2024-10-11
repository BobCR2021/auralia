// src/faunaConfig.js
import faunadb from "faunadb";

const client = new faunadb.Client({
  secret: process.env.REACT_APP_FAUNA_SECRET,
  domain: "db.eu.fauna.com",
});

export default client;
