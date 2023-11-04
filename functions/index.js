const functions = require("firebase-functions");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const foodAPI = require("./API");
const admin = require("firebase-admin");
admin.initializeApp();
const app = express();
app.use(cors({ origin: true }));
// app.use(cors({ origin: ["https://wad2-395904.web.app", "https://wad2-395904.firebaseapp.com"] }));
// app.use(cors({ origin: true }));
const corsHandler = cors({origin: true});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const firestore = admin.firestore();

// express code
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

// get meal plan for specific user

app.get("/getMealPlan/:userId", async (req, res) => {
  const userId = req.params.userId;
  const docRef = firestore.collection("Food").doc(userId);

  // Get the document
  const doc = await docRef.get();

  if (doc.exists) {
    // Get the current mealPlan object
    const mealPlan = doc.data().Plan;
    const CreatedAt = doc.data().CreatedAt;

    res.send({ mealPlan, CreatedAt });
  } else {
    res.send({ data: false });
    // "No user found with the provided ID"
  }
});
app.get("/getDisplayMealPlan/:userId", async (req, res) => {
  const userId = req.params.userId;
  const docRef = firestore.collection("Food").doc(userId);

  // Get the document
  const doc = await docRef.get();

  if (doc.exists) {
    // Get the current mealPlan object
    const DisplayMealPlan = doc.data().DisplayPlan;
    const CreatedAt = doc.data().CreatedAt;

    res.send({ DisplayMealPlan, CreatedAt });
  } else {
    res.send({ data: false });
    // "No user found with the provided ID"
  }
});

app.get("/removeBreakfast/:userId", async (req, res) => {
  const userId = req.params.userId;
  const docRef = firestore.collection("Food").doc(userId);
  const doc = await docRef.get();
  // Get the current mealPlan object
  const mealPlan = doc.data().Plan;

  // Remove the first index breakfast item
  delete mealPlan["0"]["breakfast"];

  // Update the mealPlan object in Firestore
  await doc.ref.update({ Plan: mealPlan });
});
app.get("/removeLunch/:userId", async (req, res) => {
  const userId = req.params.userId;
  const docRef = firestore.collection("Food").doc(userId);
  const doc = await docRef.get();
  // Get the current mealPlan object
  const mealPlan = doc.data().Plan;

  // Remove the first index breakfast item
  delete mealPlan["0"]["lunch"];

  // Update the mealPlan object in Firestore
  await doc.ref.update({ Plan: mealPlan });
});
app.get("/removeDinner/:userId", async (req, res) => {
  const userId = req.params.userId;
  const docRef = firestore.collection("Food").doc(userId);
  const doc = await docRef.get();
  // Get the current mealPlan object
  const mealPlan = doc.data().Plan;

  // Remove the first index breakfast item
  delete mealPlan["0"]["dinner"];

  // Update the mealPlan object in Firestore
  await doc.ref.update({ Plan: mealPlan });
});

exports.getOne = functions.https.onRequest(async (req, res) => {
  console.log("connected to getOne");
  console.log(req.query);
  const data = await foodAPI.getOne({
    params: "",
  });
  console.log("api fetch completed");
  res.json(data);
});

exports.search = functions.https.onRequest(async (req, res) => {
  corsHandler(req, res, async () => {
    console.log("connected to backend");
    const data = await foodAPI.search({
      params: req.query,
    });
    console.log("api fetch completed");
    res.json(data);
  });
});

exports.random = functions.https.onRequest(async (req, res) => {
  corsHandler(req, res, async () => {
    console.log("connected to backend");
    const data = await foodAPI.random({
      params: req.query,
    });
    console.log("api fetch completed");
    res.json(data);
  });
});

exports.getBulk = functions.https.onRequest(async (req, res) => {
  corsHandler(req, res, async () => {
    console.log("connected to getBulk");
    const data = await foodAPI.getBulk({
      params: req.query,
    });
    console.log("api fetch completed");
    // res.set ('Access-Control-Allow-Origin', '*')
    res.json(data);
  });
});

exports.manualSearch = functions.https.onRequest(async (req, res) => {
  corsHandler(req, res, async () => {
    console.log("connected to manualSearch");
    const data = await foodAPI.manualSearch(req.body);
    console.log("api fetch completed");
    res.json(data);
  });
});

exports.instantSearch = functions.https.onRequest(async (req, res) => {
  corsHandler(req, res, async () => {
    console.log("connected to instantSearch");
    const data = await foodAPI.instantSearch({
      params: req.query,
    });
    console.log("api fetch completed");
    res.json(data);
  });
});

exports.instantItem = functions.https.onRequest(async (req, res) => {
  corsHandler(req, res, async () => {
    console.log("connected to instantItem");
    const data = await foodAPI.instantItem({
      params: req.query,
    });
    console.log("api fetch completed");
    res.json(data);
  });
});

exports.getMealPlan = functions.https.onRequest(async (req, res) => {
  const userId = req.params.userId;
  const docRef = firestore.collection("Food").doc(userId);

  // Get the document
  const doc = await docRef.get();

  if (doc.exists) {
    // Get the current mealPlan object
    const mealPlan = doc.data().Plan;
    const CreatedAt = doc.data().CreatedAt;

    res.send({ mealPlan, CreatedAt });
  } else {
    res.send({ data: false });
    // "No user found with the provided ID"
  }
});

exports.getDisplayMealPlan = functions.https.onRequest(async (req, res) => {
  const userId = req.params.userId;
  const docRef = firestore.collection("Food").doc(userId);

  // Get the document
  const doc = await docRef.get();

  if (doc.exists) {
    // Get the current mealPlan object
    const DisplayMealPlan = doc.data().DisplayPlan;
    const CreatedAt = doc.data().CreatedAt;

    res.send({ DisplayMealPlan, CreatedAt });
  } else {
    res.send({ data: false });
    // "No user found with the provided ID"
  }
});

exports.removeBreakfast = functions.https.onRequest(async (req, res) => {
  const userId = req.params.userId;
  const docRef = firestore.collection("Food").doc(userId);
  const doc = await docRef.get();
  // Get the current mealPlan object
  const mealPlan = doc.data().Plan;

  // Remove the first index breakfast item
  delete mealPlan["0"]["breakfast"];

  // Update the mealPlan object in Firestore
  await doc.ref.update({ Plan: mealPlan });
});

exports.removeLunch = functions.https.onRequest(async (req, res) => {
  const userId = req.params.userId;
  const docRef = firestore.collection("Food").doc(userId);
  const doc = await docRef.get();
  // Get the current mealPlan object
  const mealPlan = doc.data().Plan;

  // Remove the first index breakfast item
  delete mealPlan["0"]["lunch"];

  // Update the mealPlan object in Firestore
  await doc.ref.update({ Plan: mealPlan });
});

exports.removeDinner = functions.https.onRequest(async (req, res) => {
  const userId = req.params.userId;
  const docRef = firestore.collection("Food").doc(userId);
  const doc = await docRef.get();
  // Get the current mealPlan object
  const mealPlan = doc.data().Plan;

  // Remove the first index breakfast item
  delete mealPlan["0"]["dinner"];

  // Update the mealPlan object in Firestore
  await doc.ref.update({ Plan: mealPlan });
});

exports.app = functions.https.onRequest(app);
