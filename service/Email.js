// const User = require("../models/User");
// // const dotenv = require("dotenv");
// const mailer = require("nodemailer");
// const jwt = require("jsonwebtoken");

// const mailsender = async (req, res) => {
//   try {
//     const resetlink = `http://localhost:4000/api/updatepassword/:id/${token}`;
//     const transportar = await mailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: `${process.env.Email_Static}`,
//         pass: "ihbsyhbkyedwrpel",
//       },
//     });
//     var mailoption = {
//       from: `${process.env.Email_Static}`,
//       to: `${user.username}`,
//       subject: "Reset your password",
//       html: `<h3>Click <a href="${resetlink}">here</a> to reset your password.</h3>`,
//     };
//     await transportar.sendMail(mailoption, (error, info, res) => {
//       if (error) {
//         console.log(error);
//       }
//       console.log(info);
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };
