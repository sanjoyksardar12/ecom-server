const express = require("express");

const { generateAccessToken, verifyAccessToken } = require("./accessToken");
const router = express.Router();

//user
const USERS = new Map();
let NO_OF_USERS = 0;

// attached userDetail in request

router.post("/create", (req, res, next) => {
  // unique username
  const { username, password } = req.body;
  const userDetail = {
    id: NO_OF_USERS++,
    username: username,
    password: password,
  };
  console.log("username- password", username, password);
  // add validation of username and password
  USERS.set(userDetail.username, userDetail);
  const token = generateAccessToken({
    id: userDetail.id,
    username: userDetail.username,
    password: userDetail.password,
  });
  console.log("token", token);
  res.set({
    "Content-Type": "application/json",
  });
  res.status(200).send({ success: true, token });
});

router.post("/login", (req, res, next) => {
  const { username, password } = req.body;
  const userDetail = USERS.get(username);
  if (!userDetail) {
    // invalid username
    return;
  }
  if (userDetail.password !== password) {
    //invalid password
    return;
  }

  const token = generateAccessToken({
    username: userDetail.username,
    password: userDetail.password,
    id: userDetail.id,
  });
  console.log("token", token);
  res.status(200).send({ success: true, token });
  //   USERS.set(userDetail.username, userDetail);
});

router.get("/list", (req, res, next) => {
  res.status(200).send({
    success: true,
    users: [...USERS.values()].map(({ username, password }) => ({
      username,
      password,
    })),
  });
});

module.exports = { router };
