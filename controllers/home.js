exports.getHome = (req, res, next) => {
    return res.status(200).render("index");
};

exports.postMessage = (req, res, next) => {
    const { name } = req.body;
    return res.status(200).json({
        data: {
            name: name,
        },
    });
};

exports.postTableBooking = (req, res, next) => {
    console.log("table entering");
    const name = req.body;
    console.log(name);
    res.send(req.body);
};
