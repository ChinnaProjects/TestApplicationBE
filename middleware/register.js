const { checkEmailExists } = require("../models/userValidation.js");
const { db } = require("../config/dataBaseSetUp.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
exports.registration = async (req, res) => {
  console.log("Registration is started");
  try {
    const { name, email, password } = req.body;
    if (!name) {
      return res.status(400).send("Enter Your Name");
    }
    console.log("Name is validated");
    if (!email) {
      return res.status(400).send("Enter your Email");
    }
    console.log("Email is validated");
    if (!password) {
      return res.status(400).send("Enter your Password");
    }
    console.log("Password is validated");
    const user = await checkEmailExists(email);
    console.log("Email is validated");
    console.log(user);
    if (user !== null) {
      console.log("Email is already Exists");
      return res.status(409).send("This Email is already Exists");
    }
    console.log("password is encrypting started");
    const myEncyPassword = await bcrypt.hash(password, 10);
    console.log("password is encrypted", myEncyPassword);
    // bcrypt.hash()
    try {
      const insertQuery =
        "INSERT INTO Admin_login_reg (name, email, password) VALUES (?,?,?)";
      [result] = await db.query(insertQuery, [name, email, myEncyPassword]);
      console.log("Record is inserted successfully", result);
    } catch (error) {
      console.log("Error During insertion", error);
    }
    console.log("Details are inserted in DB");
    const token = jwt.sign(
      {
        sno: result.insertId,
        email,
      },
      "shhhhh",
      { expiresIn: "2h" }
    );
    console.log("Token is generated");

    // user.token = token;
    // user.password = undefined;
    const newUser = {
      name,
      email,
      token,
    };
    res.status(201).json(newUser);
  } catch (error) {
    console.log("Internal Server Error");
    return res.status(500).send("Internal Server Error");
  }
};
