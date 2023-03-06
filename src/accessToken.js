const jwt = require("jsonwebtoken");
function generateAccessToken(info) {
  generated = jwt.sign(JSON.stringify(info), process.env.TOKEN_SECRET);
  return generated;
}

function verifyAccessToken(token) {
  return jwt.verify(token, process.env.TOKEN_SECRET);
}

module.exports = {
  generateAccessToken,
  verifyAccessToken,
};
