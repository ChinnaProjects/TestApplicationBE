const { db } = require("../config/dataBaseSetUp.js");
const { validateEmail } = require("../models/userValidation.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).send("Please provide Email");
    }
    console.log("email is validated");
    if (!password) {
      return res.status(400).send("Please provide Password");
    }
    console.log("password is validated");
    const user = await validateEmail(email);
    console.log("User is validated", user);
    if (!user) {
      console.log("user not found");
      return res.status(404).send("Email Not Found");
    }
    console.log("Password is compared");
    if (user && (await bcrypt.compare(password, user.password))) {
      console.log("Password is compared");
      const token = jwt.sign(
        {
          sno: user.sno,
          email,
        },
        "shhhhh",
        { expiresIn: "2h" }
      );
      user.password = undefined;
      user.token = token;
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res
        .status(200)
        .cookie("token", token, options)
        .json({ success: true, user });
    }
    // return res.status(400).send("Email and password is incorrect");
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
};
