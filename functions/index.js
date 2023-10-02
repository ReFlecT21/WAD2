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
const TelegramBot = require("node-telegram-bot-api");
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
// ------------------------------------------ TELEBOT
// ------------------------------------------ https://github.com/hosein2398/node-telegram-bot-api-tutorial
// replace the value below with the Telegram token you receive from @BotFather
const token = "6579495868:AAGgKnnPilbLVSGR4xKv9V4a8cG-O1FI-lM";
// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});
bot.on("message", msg => {
  const chatId = msg.chat.id;
  const messageText = msg.text;
  // You can add your bot's logic here and send responses back to users.
  bot.sendMessage(chatId, `You said: ${messageText}`);
});

exports.app = functions.https.onRequest(app);
