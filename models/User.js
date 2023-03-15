const mongoose = require("mongoose");
const { boolean } = require("webidl-conversions");
var uniqueValidator = require("mongoose-unique-validator");
// const autoIncrement=require('mongoose-auto-increment')

// autoIncrement.initialize(mongoose.connection);

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      min: 6,
    },
    role: {
      type: String,
      enum: ["Leader", "manager", "Admin", "Agent", "user", "SuperAdmin"],
      default: "user",
    },
    isAdmin: {
      type: Boolean,
      require: true,
      default: false,
    },
  },
  { timestamps: true }
);

UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", UserSchema);

// const employee_id ="TF001"
// let lastValue = parseInt(employee_id.slice(-1));
// lastValue++;
// myString = myString.slice(0, -1) + lastValue;
// console.log(myString);

// router.post("/login",async(req,res)=>{
//     let user = await User.findOne({ email });
//     if (user) {
//         return res.status(400).json("User already exist");
//     }
//     var salt = bcrypt.genSaltSync(10);
//     var hashedPassword = bcrypt.hashSync(req.body.password, salt);
//     user = new User({ email, username, password: hashedPassword, });
//     await user.save();
// })

// router.post("/register",async(req,res)=>{
//     try {
//         // let user = await User.findOne({ email });
//         // if (user) {
//         //     return res.status(400).json("User already exist");
//         // }
//         user = new User(req.body,{password: hashedPassword});
//         await user.save();
//         var salt = bcrypt.genSaltSync(10);
//         var hashedPassword = bcrypt.hashSync(req.body.password, salt);
//     } catch (error) {
//         console.log(error)
//     }
// })
// router.post("/register",async(req,res)=>{
//     try {
//         // let user = await User.findOne({ email });
//         // if (user) {
//         //     return res.status(400).json("User already exist");
//         // }
//         user = new User(req.body,{password: hashedPassword});
//         await user.save();
//         var salt = bcrypt.genSaltSync(10);
//         var hashedPassword = bcrypt.hashSync(req.body.password, salt);
//     } catch (error) {
//         console.log(error)
//     }
// })
