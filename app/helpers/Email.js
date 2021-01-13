const nodemailer = require('nodemailer');

var sendEmail = function (toEmail, subject, messageBody,attachmentData) {

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: "medley1109@gmail.com",
      pass: "Medley@123",
    },
  });

  let mailOptions = {
    from: "medley1109@gmail.com",
    to: toEmail,
    subject: subject,
    html: messageBody,
    attachments:attachmentData
  };

  let info = transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
  
};

module.exports.sendEmail = sendEmail;
