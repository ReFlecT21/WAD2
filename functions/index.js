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
  const data = await foodAPI.getOne("716429");
  console.log("api fetch completed");
  res.json(data);
});
app.get("/search", async (req, res) => {
  req.
  console.log("connected to backend");
  const data = await foodAPI.search("breakfast");
  console.log("api fetch completed");
  res.json(data);
});

exports.app = functions.https.onRequest(app);
