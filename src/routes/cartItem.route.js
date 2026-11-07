const express = require("express");
const router = express.Router();

const cartItemController = require("../controller/cartItem.controller.js");

router.put("/:id", authenticate, cartItemController.updateCartItem);
router.delete("/:id", authenticate, cartItemController.removeCartItems);

module.exports = router;
