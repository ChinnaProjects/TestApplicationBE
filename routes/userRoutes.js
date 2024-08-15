const express = require("express");

const { registration } = require("../middleware/register.js");
const { login } = require("../middleware/login.js");
const router = express.Router();

router.post("/registration", registration);
router.post("/login", login);
module.exports = router;
