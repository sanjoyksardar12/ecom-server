const express = require("express");
const { verifyAccessToken } = require("./accessToken");
const { CARTS } = require("./cart");

const router = express.Router();

const ORDERS = new Map();

router.get("/create/:cartId", (req, res) => {
  const cartId = +req.params.cartId;
  let token = req.headers["authorization"];
  if (!token) {
    res.send({
      success: false,
      error: {
        message: "token is not avasiable!",
      },
    });
  }
  token = token.split(" ")[1];

  const userDetail = verifyAccessToken(token);
  const { id: userId } = userDetail;

  const cartDetail = CARTS.get(cartId);
  const orderDetail = {
    id: cartId,
    cart_id: cartId,
    user_id: userId,
    created_at: Date.now(),
  };
  ORDERS.set(orderDetail.id, orderDetail);
  return res.status(200).send({
    success: true,
    message: "created order!!",
    orderId: orderDetail.id,
    cart_id: orderDetail.cart_id,
    items: [...CARTS.get(cartId).items],
  });
});

router.get("/list", (req, res) => {
  const orders = [...ORDERS.values()];
  let token = req.headers["authorization"];
  if (!token) {
    res.send({
      success: false,
      error: {
        message: "token is not avasiable!",
      },
    });
  }
  token = token.split(" ")[1];

  const userDetail = verifyAccessToken(token);
  const { id: userId } = userDetail;

  const filteredOrders = orders.filter(({ user_id }) => user_id === userId);
  const ids = filteredOrders.map(({ id }) => id);
  res.status(200).send({
    success: true,
    orderIds: ids,
  });
});

module.exports = { router };
