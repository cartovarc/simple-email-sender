var express = require("express");
var router = express.Router();
var nodemailer = require('nodemailer');

let environment = null;

if (!process.env.ON_HEROKU) {
    console.log("Loading environment variables from file...");
    const env = require('node-env-file');
    env(__dirname + '/.env');
}

environment = {
    SERVICE: process.env.SERVICE,
    SENDER_EMAIL: process.env.SENDER_EMAIL,
    SENDER_PASSWORD: process.env.SENDER_PASSWORD,
    DESTINATION_EMAIL: process.env.DESTINATION_EMAIL
}


var transporter = nodemailer.createTransport({
    service: environment.SERVICE, // may be gmail
    auth: {
        user: environment.SENDER_EMAIL,
        pass: environment.SENDER_PASSWORD
    }
});

var mailOptions = {
    from: environment.SENDER_EMAIL,
    to: environment.DESTINATION_EMAIL,
};

router.post('/send-email', function (req, res) {
    let subject = req.body.subject;
    let text = req.body.text;
    let email = req.body.email;

    mailOptions["subject"] = subject;
    mailOptions["text"] = email + "sent you this message:\n" + text;

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            res.status(500).send('Failed: ' + error);
            console.log(error);
        } else {
            res.status(200).send('Email sent: ' + info.response);
        }
    });

});


module.exports = router;