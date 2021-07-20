var nodemailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");
// var transporter = nodemailer.createTransport({
//   host: "smtp.zoho.com",
//   port: 465,
//   secure: true, // use SSL
//   auth: {
//     user: "lyfe.nirife@zoho.com",
//     pass: "lyfe12345",
//   },
// });
var transporter = nodemailer.createTransport(
  smtpTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
      user: "nirifestudio@gmail.com",
      pass: "lyfe1" + "2345!",
    },
  })
);
module.exports = () => ({
  send: (addr, html, title) =>
    new Promise((resolve, reject) => {
      var mailOptions = {
        from: "nirifestudio@gmail.com",
        to: addr,
        subject: title,
        html,
      };
      console.log(mailOptions);
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          reject(error);
        } else {
          resolve(info.response);
        }
      });
    }),
});
