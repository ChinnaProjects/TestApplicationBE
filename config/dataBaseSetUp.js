const mysql = require("mysql2/promise");
require("dotenv").config();
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
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
