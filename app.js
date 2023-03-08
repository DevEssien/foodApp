const path = require("path");
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const customerRoute = require("./routes/customer");
const homeRoute = require("./routes/home");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "*");
// });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "assets")));

app.use(homeRoute);
app.use("/subscriber", customerRoute);

app.use((error, req, res, next) => {
    const status = error?.statusCode || 500;
    const message = error?.message || "Server Side error";
    const data = error?.data || null;
    return res.status(status).json({
        status: status,
        message: message,
        data: data,
    });
});

mongoose.set("strictQuery", false);

mongoose.connect("mongodb://localhost:27017/afriFoodsDB", {
    useNewUrlParser: true,
});

app.listen(4000, () => {
    console.log("server spinning at port 4000");
});
