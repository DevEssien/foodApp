exports.getHome = async (req, res, next) => {
    return res.status(200).render("index");
};

exports.getSignup = async (req, res, next) => {
    return res.status(200).render("customerSignup");
};
