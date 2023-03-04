const Customer = require("../models/customer");
const bcrypt = require("bcryptjs");

exports.getHome = async (req, res, next) => {
    return res.status(200).render("index");
};

exports.getSignup = async (req, res, next) => {
    return res.status(200).render("customer/signup-init");
};

exports.getLogin = async (req, res, next) => {
    return res.status(200).render("customer/login");
};

exports.postSignup1 = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const customer = await Customer.findOne({ email: email });
        if (customer) {
            const error = new Error("Email already exist");
            error.statusCode = 422;
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const createCustomer = new Customer({
            email: email,
            password: hashedPassword,
        });
        await createCustomer.save();
        return res.status(201).render("index");
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

//this controller is not yet used
exports.postSignup2 = async (req, res, next) => {
    const { name, address, phoneno } = req.body;
    try {
        const customer = await Customer.findOne({ email: email });
        if (!customer) {
            const error = new Error("Customer Not Found!");
            error.StatusCode = 404;
            throw error;
        }
        customer.name = name;
        customer.address = address;
        customer.phoneno = phoneno;
        await customer.save();
        console.log("updated a customer");
        return res.status(201).render("index");
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

exports.postLogin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const customer = await Customer.findOne({ email: email });
        if (!customer) {
            const error = new Error("Customer Not Found!");
            error.StatusCode = 404;
            throw error;
        }
        try {
            const passwordMatch = await bcrypt.compare(
                password,
                customer.password
            );
            if (!passwordMatch) {
                const error = new Error("Incorrect password");
                error.statusCode = 422;
                throw error;
            }
            return res.status(200).send("logged in");
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
