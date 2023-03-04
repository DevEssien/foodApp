const express = require("express");

const customerController = require("../controllers/customer");

const router = express.Router();

router.get("/", customerController.getHome);

router.get("/signup", customerController.getSignup);

module.exports = router;
