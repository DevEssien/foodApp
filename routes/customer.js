const express = require("express");

const customerController = require("../controllers/customer");

const router = express.Router();

router.get("/", customerController.getHome);

router.get("/signup", customerController.getSignup);

router.get("/login", customerController.getLogin);

router.post("/signup", customerController.postSignup1);

router.post("/login", customerController.postLogin);

module.exports = router;
