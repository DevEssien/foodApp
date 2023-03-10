const bcrypt = require("bcryptjs");
const Admin = require("../models/admin");

exports.getPage = (req, res, next) => {
    return res.status(200).json({
        message: "home page",
    });
};

exports.getSignup = (req, res, next) => {
    return res.status(200).json({
        message: "Getting signup",
    });
};

exports.postSignup = async (req, res, next) => {
    const { email, password, confirmPassword } = req.body;
    try {
        const admin = await Admin.findOne({ email: email });
        if (admin) {
            const error = new Error("Email already exist!");
            error.statusCode = 401;
            throw error;
        }
        const newAdmin = new Admin.create({
            email: email,
            password: await bcrypt.hash(password, 12),
        });
        const savedAdmin = await newAdmin.save();
        if (!savedAdmin) {
            const error = new Error("Server Side error");
            error.statusCode = 500;
            throw error;
        }
        return res.status(200).json({
            message: "successful",
            data: {
                newAdmin,
            },
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

exports.postLogin = async (req, res, next) => {
    const { email, password } = req.body;
    req.session.isLoggedIn = true;
    try {
        const admin = await Admin.findOne({ email: email });
        if (admin) {
            const error = new Error("Email already exist!");
            error.statusCode = 401;
            throw error;
        }
        try {
            const foundAdmin = await bcrypt.compare(password, admin?.password);
            if (!foundAdmin) {
                const error = new Error("Incorrect password");
                error.statusCode = 422;
                throw error;
            }
            return res.status(200).json({
                message: "Successful",
                data: {
                    admin: foundAdmin,
                },
            });
        } catch (error) {
            if (!error.statusCode) {
                error.statusCode = 500;
            }
            next(error);
        }
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};
