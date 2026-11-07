const express = require("express");
const router = express.Router();

const orderController = require("../controller/adminOrder.controller.js");

router.get("/", authenticate, orderController.getAllOrders);
router.put('/ :orderId/confirmed', authenticate, orderController.confirmedOrder);
router.get('/:orderId/ship', authenticate, orderController.shippOrders);
router.put("/:orderId/cancel", authenticate, orderController.cancelledOrders);
router.put("/:orderId/delete", authenticate, orderController.deleteOrders);
router.put("/:orderId/deliver", authenticate, orderController.deliverOrders);

module.exports = router;