require("dotenv").config();
const Mailjet = require("node-mailjet");

const mailjet = Mailjet.apiConnect(process.env.MJ_APIKEY, process.env.MJ_API_SECRET);

exports.sendmail = async (res, name, subject, msg) => {
    const request = await mailjet.post("send", { version: "v3.1" }).request({
        Messages: [
            {
                From: {
                    Email: "essienemma300dev@gmail.com",
                    Name: name,
                },
                To: [
                    {
                        Email: "essienemma300@gmail.com", //,
                        Name: "AFRIFOODS",
                    },
                ],
                Subject: subject,
                TextPart: "This is " + name,
                HTMLPart: msg,
            },
        ],
    });
    if (!request.response.status === 200) {
        return res.status(request.response.status).json({
            status: request.response.status,
            message: request.response.status === 200 ? "mail sent" : "mail Not sent",
        });
    }
    return res.status(request.response.status).json({
        status: request.response.status,
        message: request.response.status === 200 ? "mail sent" : "mail Not sent",
    });
};
