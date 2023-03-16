const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createError } = require("../utility/createError");

router.post("/register", async (req, res, next) => {
  try {
    const { username } = req.body;
    const existingUser = await User.findOne({
      $or: [{ username }],
    });
    if (existingUser) {
      return next(createError(404, "User Already Existing"));
    }
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = await User({ ...req.body, password: hash });
    const savedUser = await newUser.save();
    next(createError(200, "Register Sucessfully"));
  } catch (err) {
    next(err);
  }
});

// Login user

router.post("/login", async (req, res, next) => {
  try {
    const username = await User.findOne({ username: req.body.username });
    if (!username) return next(createError(404, "User is not found"));
    const checkPassword = bcrypt.compareSync(
      req.body.password,
      username.password
    );
    if (!checkPassword) return next(createError(500, "wrong password"));
    const accessToken = jwt.sign(
      {
        id: username._id,
        isAdmin: username.isAdmin,
      },
      process.env.JWT_PASS,
      { expiresIn: "5d" }
    );
    const { password, ...others } = username._doc;
    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
