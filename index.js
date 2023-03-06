const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const user = require("./api/user");
const item = require("./api/item");
const cart = require("./api/cart");
const order = require("./api/order");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const PORT = 4000;

const app = express();
app.use(
  cors({
    origin: "https://ecom-client-one.vercel.app/",
  })
);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true })); // to uspport JSON-encoded bodies
app.use(express.json());

app.use("/api/user", user.router);
app.use("/api/item", item.router);
app.use("/api/cart", cart.router);
app.use("/api/order", order.router);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
