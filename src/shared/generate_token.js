const authConfig = require("../config/auth.json");
const jwt = require("jsonwebtoken");

module.exports = (params = {}, time = 86400) => {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: time,
  });
};
