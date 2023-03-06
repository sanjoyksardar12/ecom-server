const jwt = require("jsonwebtoken");
let generated = "";
function generateAccessToken(info) {
  generated = jwt.sign(JSON.stringify(info), "process.env.TOKEN_SECRET");
  return generated;
}

function verifyAccessToken(token) {
  console.log(token === generated);
  return jwt.verify(token, "process.env.TOKEN_SECRET");
}

// const token = generateAccessToken({ username: "sanjoy", password: "sardasr" });
// console.log("toekn---", token);
// console.log(verifyAccessToken(token));

module.exports = {
  generateAccessToken,
  verifyAccessToken,
};
