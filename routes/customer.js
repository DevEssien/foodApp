const express = require("express");
const { check, body } = require("express-validator/check");

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
                        return Promise.reject(
                            new Error(
                                "Email already exist, enter another Email"
                            )
                        );
                    }
                } catch (error) {
                    if (!error.statusCode) {
                        error.statusCode = 500;
                    }
                    next(error);
                }
            })
            .normalizeEmail(),
        body("password").isLength({ min: 4 }).trim(),
    ],
    customerController.postSignup1
);

router.post(
    "/login",
    [
        check("email")
            .isEmail()
            .withMessage("Please enter a valid email address")
            .normalizeEmail(),
    ],
    customerController.postLogin
);

module.exports = router;
