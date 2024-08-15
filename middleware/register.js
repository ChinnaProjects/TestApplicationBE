const { checkEmailExists } = require("../models/userValidation.js");
const { db } = require("../config/dataBaseSetUp.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.registration = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).send("Missing required fields");
    }

    const user = await checkEmailExists(email);
    if (user) {
      return res.status(409).send("This Email is already Exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const insertQuery =
      "INSERT INTO Admin_login_reg (name, email, password) VALUES (?,?,?)";
    const [result] = await db.query(insertQuery, [name, email, hashedPassword]);

    const token = jwt.sign(
      { sno: result.insertId, email },
      process.env.JWT_SECRET || "shhhhh",
      { expiresIn: "2h" }
    );

    res.status(201).json({ name, email, token });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).send("Internal Server Error");
  }
};
