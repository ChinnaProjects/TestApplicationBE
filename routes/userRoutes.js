const express = require("express");

// const { home } = require("../middleware/home.js");
const { registration } = require("../middleware/register.js");
const { login } = require("../middleware/login.js");
// const { login } = require("../middleware/login.js");
// const { memberRegistration } = require("../middleware/MemberRegistration.js");
const router = express.Router();

// router.get("/", home);
router.post("/registration", registration);
router.post("/login", login);
// router.post("/login", login);
// router.post("/memberregistration", memberRegistration);
module.exports = router;
