const express = require('express');
const router = express.Router();
const { verifyAccessToken, generateAccessToken } = require('./accessToken');

const CARTS = new Map();
let NO_OF_CARTS = 0;

function getCardDetailFromUserId(userId) {
  return [...CARTS.values()].find(({ user_id, is_purchased }) => user_id === userId && !is_purchased);
}

// TODO: add authorization middleware

router.post('/add', (req, res) => {
  const { items } = req.body;

  let token = req.headers.authorization;
  if (!token) {
    res.send({
      success: false,
      error: {
        message: 'token is not avasiable!'
      }
    });
  }
  token = token.split(' ')[1];

  const userDetail = verifyAccessToken(token);
  const { id: userId } = userDetail;

  let cartDetail = getCardDetailFromUserId(userDetail.id);

  if (!cartDetail) {
    cartDetail = {
      id: NO_OF_CARTS++,
      user_id: userId,
      is_purchased: false,
      created_at: Date.now(),
      items: new Set(items)
    };

    const newToken = generateAccessToken({
      ...userDetail,
      cartId: cartDetail.id
    });

    //update new token
    res.cookie('token', newToken, { expires: new Date(Date.now() + 900000) });

    CARTS.set(cartDetail.id, cartDetail);
  } else {
    items.forEach((itemId) => cartDetail.items.add(itemId));
  }
  res.status(200).send({
    items: Array.from(cartDetail.items),
    cartId: cartDetail.id,
    success: true,
    message: 'Item successfully added to the cart!!'
  });
});

router.get('/:cartId/complete', (req, res) => {
  // move this to user middleware

  let cartDetail = CARTS.get(+req.params.cartId);

  cartDetail.is_purchased = true;

  // req.session.cartAndUserInfo = { ...cartDetail, userId: userId };
  res.header('Authorization', req.headers['authorization']);
  res.redirect(`/api/order/create/${+req.params.cartId}`);
});

router.get('/list', (req, res) => {
  const carts = [...CARTS.values()].map((cart) => ({
    id: cart.id,
    user_id: cart.user_id,
    is_purchased: cart.is_purchased,
    created_at: new Date(cart.created_at)
  }));

  res.status(200).send({ success: true, carts: carts });
});
module.exports = { router, CARTS };
