const telebot = require("./telebot");
const functions = require("firebase-functions");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const foodAPI = require("./API");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get("/test", (req, res) => {
  res.send("lets go suck my ass ");
});
app.get("/getOne", async (req, res) => {
  console.log("connected to getOne");
  console.log(req.query);
  const data = await foodAPI.getOne({
    params: "",
  });
  console.log("api fetch completed");
  res.json(data);
});
app.get("/search", async (req, res) => {
  console.log("connected to backend");
  const data = await foodAPI.search({
    params: req.query,
  });
  console.log("api fetch completed");
  res.json(data);
});
app.get("/random", async (req, res) => {
  console.log("connected to backend");
  const data = await foodAPI.random({
    params: req.query,
  });
  console.log("api fetch completed");
  res.json(data);
});
app.get("/getBulk", async (req, res) => {
  console.log("connected to backend");
  const data = await foodAPI.getBulk({
    params: req.query,
  });
  console.log("api fetch completed");
  res.json(data);
});
app.post("/manualSearch", async (req, res) => {
  console.log("connected to manualSearch");
  const data = await foodAPI.manualSearch(req.body);
  console.log("api fetch completed");
  res.json(data);
});
app.get("/instantSearch", async (req, res) => {
  console.log("connected to instantSearch");
  const data = await foodAPI.instantSearch({
    params: req.query,
  });
  console.log("api fetch completed");
  res.json(data);
});
app.get("/instantItem", async (req, res) => {
  console.log("connected to instantItem");
  const data = await foodAPI.instantItem({
    params: req.query,
  });
  console.log("api fetch completed");
  res.json(data);
});

exports.app = functions.https.onRequest(app);
