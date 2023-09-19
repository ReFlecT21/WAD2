/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// const { onRequest } = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
// import functions from "firebase-functions"
// import express from "express";
// import cors from "cors";
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const foodAPI = require("./API");

const app = express();
app.use(cors());

app.get("/test", (req, res) => {
  res.send("lets go suck my ass ");
});
// testing api connections to the food API
// app.get("/testAPIasync", async (req, res) => {
//   console.log("connected to backend");
//   const data = await foodAPI.getOne("716429");
//   console.log("api fetch completed");
//   res.json(data);
// });
// app.get("/testAPI", (req, res) => {
//   foodAPI.getOne("716429")
//     .then(data => {
//       console.log(data);
//       res.json(data);
//     })
//     .catch(err => console.log(err));
// });
// implementation of food API
app.get("/getOne", async (req, res) => {
  console.log("connected to backend");
  const data = await foodAPI.getOne({
    params: req.query,
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
app.get("/manualSearch", async (req, res) => {

  fetch("https://www.nutritionix.com/track-api/v2/natural/nutrients", {
  "headers": {
    "accept": "application/json, text/plain, */*",
    "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
    "content-type": "application/json",
    "sec-ch-ua": "\"Chromium\";v=\"116\", \"Not)A;Brand\";v=\"24\", \"Google Chrome\";v=\"116\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "cookie": "AWSELB=2B0FF5CD0605B75731CF5A1A9C8743998EAB3A76261ED56F8EE8DFDFBA7CE8465E3C7D313E3AA9D0C41199E174133837928EDB9E7483E43C9E770784A84807D272FF8F19D0; AWSELBCORS=2B0FF5CD0605B75731CF5A1A9C8743998EAB3A76261ED56F8EE8DFDFBA7CE8465E3C7D313E3AA9D0C41199E174133837928EDB9E7483E43C9E770784A84807D272FF8F19D0; _gid=GA1.2.1237060472.1695137990; _mkto_trk=id:539-CDH-942&token:_mch-nutritionix.com-1695137989996-93634; _ga_TP4YLX00Y6=GS1.2.1695138060.1.1.1695138365.38.0.0; _ga=GA1.1.1882839961.1695137990; _gat=1; _ga_842K8SRYJT=GS1.2.1695137991.1.1.1695138501.58.0.0; _ga_7CXYGG9VCZ=GS1.1.1695137989.1.1.1695138523.0.0.0",
    "Referer": "https://www.nutritionix.com/food/prata",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": "{\"query\":\"prata\",\"include_subrecipe\":true,\"use_raw_foods\":false,\"line_delimited\":true,\"claims\":true,\"taxonomy\":true,\"ingredient_statement\":true}",
  "method": "POST"
  });

  fetch("https://www.nutritionix.com/track-api/v2/search/instant?branded=true&common=true&query=as&self=false", {
  "headers": {
    "accept": "application/json, text/plain, */*",
    "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
    "sec-ch-ua": "\"Chromium\";v=\"116\", \"Not)A;Brand\";v=\"24\", \"Google Chrome\";v=\"116\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "cookie": "_gid=GA1.2.1237060472.1695137990; _mkto_trk=id:539-CDH-942&token:_mch-nutritionix.com-1695137989996-93634; AWSELB=2B0FF5CD0605B75731CF5A1A9C8743998EAB3A762687D9E2A2C5F2DFA65D4637CED33FA03C5E03D392402D02850D283CE9E7FFE81102C74507DE16F47A02DFA2F7722AF7AC; AWSELBCORS=2B0FF5CD0605B75731CF5A1A9C8743998EAB3A762687D9E2A2C5F2DFA65D4637CED33FA03C5E03D392402D02850D283CE9E7FFE81102C74507DE16F47A02DFA2F7722AF7AC; _ga_TP4YLX00Y6=GS1.2.1695138060.1.1.1695139140.60.0.0; _ga_7CXYGG9VCZ=GS1.1.1695137989.1.1.1695139222.0.0.0; _ga=GA1.2.1882839961.1695137990; _ga_842K8SRYJT=GS1.2.1695137991.1.1.1695139222.60.0.0",
    "Referer": "https://www.nutritionix.com/natural-demo?q=1%20cup%20mashed%20potatoes%20and%202%20tbsp%20gravy&s=1",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
});
  
  
  console.log("connected to backend");
  const data = await foodAPI.getBulk({
    params: req.query,
  });
  console.log("api fetch completed");
  res.json(data);
});

exports.app = functions.https.onRequest(app);
