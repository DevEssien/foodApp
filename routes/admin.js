const express = require("express");
const { body, check } = require("express-validator");

const adminController = require("../controllers/admin");
const Admin = require("../models/admin");

const router = express.Router();

/** GET /admin/route */

router.get("/page", adminController.getPage);

router.get("/signup", adminController.getSignup);

/** POST /admin/route */

router.post(
    "/signup",
    [
        check("email")
            .isEmail()
            .withMessage("Please enter a valid email address")
            .custom(async (email, { req }) => {
                try {
                    const admin = await Admin.findOne({ email: email });
                    if (admin) {
                        return Promise.reject(new Error("Email already exist"));
                    }
                } catch (error) {
                    console.log(error);
                }
            })
            .normalizeEmail(),
        body("password", "Please enter a password with at least 4 characters long")
            .isAlphanumeric()
            .isLength()
            .trim(),
    ],
    adminController.postSignup,
);

router.post("/login", adminController.postLogin);

module.exports = router;
