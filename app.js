require("dotenv").config();
const cors = require("cors");
const express = require("express");
const { testConnection } = require("./config/dataBaseSetUp.js");
const router = require("./routes/userRoutes.js");

const app = express();
const corsOptions = {
  origin: "https://test-application-ui.vercel.app", // Frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rest of your existing app configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

testConnection();
app.use("/", router);
module.exports = app;
