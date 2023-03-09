require("dotenv").config();
const Mailjet = require("node-mailjet");

const mailjet = Mailjet.apiConnect(
    process.env.MJ_APIKEY,
    process.env.MJ_API_SECRET
);

exports.sendmail = async (res, name, email, subject, message) => {
    const request = await mailjet.post("send", { version: "v3.1" }).request({
        Messages: [
            {
                From: {
                    Email: email,
                    Name: name,
                },
                To: [
                    {
                        Email: "essienemma300dev@gmail.com",
                        Name: "AFRIFOODS",
                    },
                ],
                Subject: subject,
                TextPart: message,
                HTMLPart: message,
            },
        ],
    });
    return res.status(request.response.status).json({
        status: request.response.status,
        message:
            request.response.status === 200 ? "mail sent" : "mail Not sent",
    });
    // console.log(
    //     request.response.status === 200 ? "mail sent" : "mail Not sent"
    // );
};
