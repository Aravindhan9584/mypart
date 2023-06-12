const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createError } = require("../utility/createError");

// Register User

module.exports.Registeruser = async (req, res, next) => {
  try {
    const { username } = req.body;
    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
      return next(createError(404, "User Already Existing"));
    }
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = await User({ ...req.body, password: hash });
    const savedUser = await newUser.save();
    res.send(savedUser);
    next();
  } catch (err) {
    next(err);
  }
};

// Login user

module.exports.Login = async (req, res, next) => {
  try {
    const username = await User.findOne({ username: req.body.username });
    if (!username) return next(createError(404, "User is not found"));
    const checkPassword = bcrypt.compareSync(
      req.body.password,
      username.password
    );
    if (!checkPassword) return next(createError(500, "wrong password"));
    const token = jwt.sign(
      {
        id: username._id,
        isAdmin: username.isAdmin,
      },
      process.env.JWT_PASS,
      { expiresIn: "5d" }
    );

    const { password, ...others } = username._doc;
    res
      .cookie("accessToken", token, {
        httponly: true,
      })
      .status(200)
      .json(others);
    // res.status(200).json({ ...others, accessToken });
  } catch (err) {
    return next(err);
  }
};

module.exports.logout = async (req, res, next) => {};

// module.exports.signup = async (User) => {
//   let user = await User.findOne({ email: username.email });
//   if (user) {
//     throw new Error("Email already exist");
//   }
//   user = new User(data);
//   const token = JWT.sign({ id: user._id }, JWTSecret);
//   await user.save();
//   return (User = {
//     userId: user._id,
//     email: user.email,
//     name: user.name,
//     token: token,
//   });
// };
