const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth.controller");

router.post("/signup", AuthController.signup);

router.post("/signin", AuthController.signin);

router.post("/change-password", AuthController.changePassword);

module.exports = router;
