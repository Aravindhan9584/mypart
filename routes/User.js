const router = require("express").Router();
const User = require("../models/User");
const Mailer = require("nodemailer");
// const Address =require("../models/Address")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  verifytoken,
  verifytokenandAuth,
  verifytokenadmin,
} = require("./verification");

// Register User

router.post("/register", async (req, res) => {
  try {
    const { username } = req.body;
    const existingUser = await User.findOne({
      $or: [{ username }],
    });
    if (existingUser) {
      return res.status(409).json({ Error: "User Already Excisting" });
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
      return res.status(200).json({ ErrorMassage: "wroung password" });
    const accessToken = jwt.sign(
      {
        id: username._id,
        isAdmin: username.isAdmin,
      },
      process.env.JWT_PASS,
      { expiresIn: "3d" }
    );
    const { password, ...others } = username._doc;
    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    return console.log(err);
  }
});

// get All User

router.get("/users", verifytokenadmin, async (req, res) => {
  try {
    const getuser = await User.find().sort({ _id: -1 });
    res.send(getuser);
  } catch (error) {
    console.log(error);
  }
});

// Update user

router.put("/update/:id", verifytokenandAuth, async (req, res) => {
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
    return console.log(err);
  }
});

// get User

router.get("/:id", verifytokenandAuth, async (req, res) => {
  try {
    const getUser = await User.findById(req.params.id);
    res.status(200).json(getUser);
  } catch (err) {
    return err;
  }
});

// Delete User

router.delete("/:id", verifytokenandAuth, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted");
  } catch (err) {
    return err;
  }
});

router.post("/forgot-password", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      res.status(404).json("user not exist");
    }
    var transportar = Mailer.createTransport({
      service: "gmail",
      auth: {
        user: "harikaran1233311@gmail.com",
        pass: "esntvdubtpenphnu",
      },
    });

    var mailOptions = {
      from: "harikaran1233311@gmail.com",
      to: `${user.username}`,
      subject: "Email Subjects",
      html: "<h1>Welcome Reciver</h1><p>That was easy!</p>",
    };
    transportar.sendMail(mailOptions, (error, info) => {
      if (error) console.log(error);
      console.log(info);
    });
  } catch (error) {
    res.status(500).json(err);
  }
});

router.put("/updatepassword", async (req, res) => {
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

module.exports = router;

//   geta status of user register
// router.get("/status",async(req,res)=>{

//     console.log("hi this is aravind")
//     const date = new Date();
//     // console.log(date)y
//     const lastyear =new Date(date.setfullyear(date.getfullyear()-1));
//     try {
//         const data = await User.aggrigate([
//             {$match:{createdAt:{$gte:lastyear}}},
//             {
//                 $project:{
//                     month:{$month :"$createdAt"}
//                 }
//             },
//             {
//                 $group:{
//                     id:"$month",
//                     total :{$sum:1}
//                 }
//             }
//         ])
//         res.status(200).json(data)
//     } catch (error) {
//         res.status(500).json(error)

//     }
// })
// const latestCustomer = await User.findOne({}, 'employee_id').sort({$natural:-1}).limit(1);
// let newID;
// if (latestCustomer){const lastNum = parseInt(latestCustomer.employee_id.match(/\d+$/)[0]);
// newID = 'TF' + (lastNum + 1).toString().padStart(4, '0');
// }else {newID = 'TF0001'}
