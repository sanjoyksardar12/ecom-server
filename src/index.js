const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const user = require("./user");
const item = require("./item");
const cart = require("./cart");
const order = require("./order");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const PORT = 4000;

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true })); // to uspport JSON-encoded bodies
app.use(express.json());
app.use((req, res, next) => {
  console.log("sanjoy", req.body);

  next();
});

app.use("/user", user.router);
app.use("/item", item.router);
app.use("/cart", cart.router);
app.use("/order", order.router);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
