const { db } = require("../config/dataBaseSetUp.js");

const checkEmailExists = async (email) => {
  console.log("Checking if Email Exists:", email);
  const query = "SELECT * FROM Admin_login_reg WHERE email=?";
  const [result] = await db.query(query, [email]);
  console.log(result);
  return result.length > 0 ? result[0] : null;
};

const validateEmail = async (email) => {
  console.log("Checking email", email);
  const query = "select * from Admin_login_reg where email=?";
  const [result] = await db.query(query, [email]);
  console.log(result);
  return result.length > 0 ? result[0] : null;
};
module.exports = { checkEmailExists, validateEmail };
