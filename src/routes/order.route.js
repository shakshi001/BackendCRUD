const express = require("express")
const router = express.Router();

const orderController = require("../controller/order.contoller.js");
const authenticate = require("../middlewares/authenticate.js");

router.post("/", authenticate.orderController.createOrder);
router.get("/user", authenticate, orderController.orderHistory);
router.get("/:id", authenticate, orderController.findOrderById);

module.exports = router;