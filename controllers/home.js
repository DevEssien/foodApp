const Mail = require("../utils/send-mail");

exports.getHome = (req, res, next) => {
    return res.status(200).render("index");
};

exports.postMessage = (req, res, next) => {
    const { name, email, subject, message } = req.body;
    Mail.sendmail(res, name, email, subject, message);
    // return res.redirect("/");
};

exports.postTableBooking = (req, res, next) => {
    const { name, email, phone, date, message, people } = req.body;
    const msg = `
        <p1></p>
    `;
};
