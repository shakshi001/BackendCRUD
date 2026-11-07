const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors())

app.get("/", (req, res) => {
    return res.status(200).send({ message: "welcome to ecommerce api - node", status: true });
})

const authRouters = require("./routes/auth.route.js");
app.use("/auth", authRouters);

const userRouters = require("./routes/user.route.js");
app.use("/users", userRouters);

const productRouter = require("./routes/product.route.js");
app.use("/api/products", productRouter);

const adminProduct = require("./routes/adminProduct.route.js");
app.use("/api/admin/products", adminProduct);

const cartRouter = require("./routes/cart.route.js");
app.use("/api/cart", cartRouter);

const cartItem = require("./routes/cartItem.route.js");
app.use("/api/cartItems", cartItem);

const orderRouter = require("./routes/order.route.js");
app.use("/api/order", orderRouter);

const reviewRouter = require("./routes/review.route.js");
app.use("/api/review", reviewRouter);

const ratingRouter = require("./routes/rating.route.js");
app.use("/api/rating", ratingRouter);

const adminOrderRouter = require("./routes/adminProduct.route.js");
app.use("/api/admin/order", adminOrderRouter);
module.exports = app;
