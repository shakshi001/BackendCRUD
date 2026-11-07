const express = require("express");
const router = express.Router();

const productController = require("../controller/product.controller.js");

router.post("/",authenticate, productController.createProducts);
router.post("/creates", authenticate, productController.createMultipleProduct);
router.delete("/:id", authenticate, productController.deleteProduct);
router.put("/:id", authenticate, productController.updateProduct);


module.exports = router;