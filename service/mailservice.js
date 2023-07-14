const User = require("../models/User");
const mailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const resetpassword = async (req, res) => {
  try {
    const { id } = req.params;
    const user1 = await User.findOne({ _id: id });
    // console.log(user1.password);
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);
    if (req.body.password) {
      req.body.password = hash;
    }
    const edited = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    User.find(edited)
      .populate("User")
      .exec(function (err, User) {});
    res.status(200).send("password updated Successfully");
  } catch (error) {
    console.log(error);
  }
};

const Forgetpassword = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    id = user._id;
    // console.log(id);
    if (!user) {
      res.status(404).json({ error: "User not exist" });
    }
    const token = jwt.sign({ id: user._id }, "secret-key", {
      expiresIn: "1h",
    });
    await user.updateOne({
      resetToken: token,
      resetTokenExpires: Date.now() + 3600,
    });
    const resetlink = `http://localhost:4000/api/resetpassword/${id}`;
    const transportar = await mailer.createTransport({
      service: "gmail",
      auth: {
        user: `${process.env.Email_Static}`,
        pass: "ihbsyhbkyedwrpel",
      },
    });
    var mailoption = {
      from: `${process.env.Email_Static}`,
      to: `${user.username}`,
      subject: "Reset your password",
      html: `<h3>Click <a href="${resetlink}">here</a> to reset your password.</h3>`,
    };
    await transportar.sendMail(mailoption, (error, info, res) => {
      if (error) {
        console.log(error);
      }
      console.log(info);
    });
  } catch (error) {
    console.log(error);
  }
  res.status(200).send("mail Send successfully");
};

// const updatepassword = (req, res) => {
//   try {
//     const { id, token } = req.params;
//     // const
//   } catch (error) {
//     console.log(error);
//   }
// };

module.exports = { Forgetpassword, resetpassword };
