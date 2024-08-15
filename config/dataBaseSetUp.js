const mysql = require("mysql2/promise");
require("dotenv").config();
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "chinna",
  database: "madhurimenspgandhostaldb",
});

const testConnection = async () => {
  try {
    await db.query("SELECT 1");
    console.log("Database Connection is Successful");
  } catch (error) {
    console.log("Database connection is failed", error);
  }
};

module.exports = { db, testConnection };
