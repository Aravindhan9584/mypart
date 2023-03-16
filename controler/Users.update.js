const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  verifytoken,
  verifytokenandAuth,
  verifytokenadmin,
} = require("../service/verification");
/////
// GetAll User
router.get("/user", verifytokenadmin, async (req, res) => {
  try {
    const getuser = await User.find().sort({ _id: -1 });
    res.send(getuser);
  } catch (error) {
    console.log(error);
  }
});

// Update user

router.put("/update/:id", verifytokenandAuth, async (req, res, next) => {
  try {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);
    if (req.body.password) {
      req.body.password = hash;
    }
    const edituser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(edituser);
  } catch (err) {
    return next(err);
  }
});

// get User

router.get("/:id", verifytokenandAuth, async (req, res, next) => {
  try {
    const getUser = await User.findById(req.params.id);
    res.status(200).json(getUser);
  } catch (err) {
    return next(err);
  }
});

// Delete User

router.delete("/:id", verifytokenandAuth, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted");
  } catch (err) {
    return next(err);
  }
});

// router.get("/reset-password/:token", function (req, res) {
//   const { token } = req.params;
//   const user = User.find((user) => user._id === token);
//   if (!user) {
//     return res.status(404).send("Invalid token");
//   }
//   res.render("updatepassword", { token });
// });

// update password user
router.put("/updatepassword/:token", async (req, res) => {
  try {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);
    if (req.body.password) {
      req.body.password = hash;
    }
    const edituserq = await User.findByIdupdate(
      req.body.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(edituserq);
  } catch (err) {
    return console.log(err);
  }
});

// router.post("/reset-password", function (req, res) {
//   const { token, password } = req.body;
//   const user = User.find((user) => user.resetToken === token);
//   if (!user) {
//     return res.status(404).send("Invalid token");
//   }
//   user.password = password;
//   user.resetToken;
// });
module.exports = router;
