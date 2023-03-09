const Mail = require("../utils/send-mail");

exports.getHome = (req, res, next) => {
    return res.status(200).render("index");
};

exports.postMessage = (req, res, next) => {
    const { name, email, subject, message } = req.body;
    const msg = `
        <p1> name: ${name}</p>
        <p1> email: ${email}</p>
        <p1> message: ${message}</p>
    `;
    Mail.sendmail(res, name, subject, msg);
    // return res.redirect("/");
};

exports.postTableBooking = (req, res, next) => {
    const { name, email, phone, date, message, people } = req.body;
    const subject = "Booking a table";
    const msg = `
        <p1> name: ${name}</p>
        <p1> email: ${email}</p>
        <p1> phone: ${phone}</p>
        <p1> date: ${date}</p>
        <p1> message: ${message}</p>
        <p1> people: ${people}</p>
    `;
    Mail.sendmail(res, name, subject, msg);
};
