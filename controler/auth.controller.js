const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  try {
    const { username } = req.body;
    const existingUser = await User.findOne({
      $or: [{ username }],
    });
    if (existingUser) {
      return res.status(409).json({ Error: "User Already Existing" });
    }
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = await User({ ...req.body, password: hash });
    const savedUser = await newUser.save();
    res.status(200).json({ Response: "Register Sucessfully" });
  } catch (err) {
    console.log(err);
  }
});

// Login user

router.post("/login", async (req, res) => {
  try {
    const username = await User.findOne({ username: req.body.username });
    if (!username) return res.status(200).json({ Error: "User is not found" });
    const checkPassword = bcrypt.compareSync(
      req.body.password,
      username.password
    );
    if (!checkPassword)
      return res.status(200).json({ ErrorMessage: "wrong password" });
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
    return console.log(err);
  }
});

module.exports = router;
