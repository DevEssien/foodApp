const express = require("express");

const homeController = require("../controllers/home");

const router = express.Router();

router.get("/", homeController.getHome);

router.post("/message", homeController.postMessage);

router.post("/book-a-table", homeController.postTableBooking);

module.exports = router;
