const express = require("express");
const { check, body } = require("express-validator");

const customerController = require("../controllers/customer");
const Customer = require("../models/customer");

const router = express.Router();

router.get("/signup", customerController.getSignup);

router.get("/login", customerController.getLogin);

router.post(
    "/signup",
    [
        check("email")
            .isEmail()
            .withMessage("Please enter a valid email")
            .custom(async (email, { req }) => {
                try {
                    const foundCustomer = await Customer.findOne({
                        email: email,
                    });
                    if (foundCustomer) {
                        return Promise.reject(new Error("Email already exist, enter another Email"));
                    }
                } catch (error) {
                    console.log(error);
                }
            })
            .normalizeEmail(),
        body("password", "Please enter a password with at least 4 characers long")
            .isAlphanumeric()
            .isLength({ min: 4 })
            .trim(),
    ],
    customerController.postSignup1,
);

router.post(
    "/login",
    [
        check("email").isEmail().withMessage("Please enter a valid email address").normalizeEmail(),
        body("password").isAlphanumeric().trim(),
    ],
    customerController.postLogin,
);

module.exports = router;
