const express = require("express")
const router = express.Router();
const authController = require("../controller/auth.controller.js");


router.post("/signup", authController.register);
router.post("/signin", authContoller.login);

module.exports = router;
