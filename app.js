const path = require("path");
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const customerRoute = require("./routes/customer");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "assets")));

app.use("/subscriber", customerRoute);

mongoose.set("strictQuery", false);

mongoose.connect("mongodb://localhost:27017/afriFoodsDB", {
    useNewUrlParser: true,
});

app.listen(4000, () => {
    console.log("server spinning at port 4000");
});
