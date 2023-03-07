const express = require('express');

const { generateAccessToken } = require('./accessToken');
const router = express.Router();

//user
const USERS = new Map();
let NO_OF_USERS = 1;

// attached userDetail in request
function createAccount(username, password) {
  const userDetail = {
    id: NO_OF_USERS++,
    username: username,
    password: password
  };
  // add validation of username and password
  USERS.set(userDetail.username, userDetail);
  return userDetail;
}

function generateUserToken(userDetail) {
  const token = generateAccessToken({
    id: userDetail.id,
    username: userDetail.username,
    password: userDetail.password
  });
  return token;
}

router.post('/create', (req, res) => {
  // unique username
  const { username, password } = req.body;
  const userDetail = createAccount(username, password);
  const token = generateUserToken(userDetail);

  res.set({
    'Content-Type': 'application/json'
  });
  res.status(200).send({ success: true, token });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  let userDetail = USERS.get(username);

  if (userDetail && userDetail.password !== password) {
    res.set({
      'Content-Type': 'application/json'
    });
    res.status(401).send({
      success: false,
      message: 'Invalid username or password!!'
    });
    return;
  }
  if (!userDetail) {
    userDetail = createAccount(username, password);
  }

  let token = generateAccessToken({
    username: userDetail.username,
    password: userDetail.password,
    id: userDetail.id
  });

  res.status(200).send({ success: true, token });
});

router.get('/list', (req, res) => {
  res.status(200).send({
    success: true,
    users: [...USERS.values()].map(({ username, password }) => ({
      username,
      password
    }))
  });
});

module.exports = { router };
