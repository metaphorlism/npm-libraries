const { createTransport } = require("nodemailer");
require("dotenv").config({});

// Create a transporter object
let transporter = createTransport({
  host: "smtp-relay.sendinblue.com",
  port: 587,
  auth: {
    user: "metaphorlism@gmail.com",
    pass: process.env.SMTP_PASSWORD,
  },
});

const sendEmail = (res, receiver, subject, text) => {
  // Create a mailOptions object
  let mailOptions = {
    from: "metaphorlism@gmail.com",
    to: receiver,
    subject: subject,
    text: text,
  };

  // Send the email
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return res.status(500).json({
        status: "Fail",
        message: error.message,
      });
    } else {
      res.status(200).json({
        status: "Success",
        message: info.response,
      });
    }
  });
};

module.exports = sendEmail;
