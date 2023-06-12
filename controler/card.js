const Card = require("../models/Card");
const { createError } = require("../utility/createError");
const User = require("../models/User");

// createcard
module.exports.createcard = async (req, res, next) => {
  try {
    const { createdBy } = req.body;
    // const { companyname, email } = req.body;
    // const existingcard = await Card.findOne({
    //   companyname: companyname,
    //   email: email,
    // });
    // if (existingcard) {
    //   return next(createError(404, "Card Already Existing"));
    // }
    const user = await User.findOne({ createdBy: createdBy }).populate(
      "createdBy"
    );
    // console.log(user);
    const newcard = await Card(req.body, { createdBy: user });
    // console.log(newcard);
    const savecompany = await newcard.save();
    res.status(200).json(savecompany);
  } catch (error) {
    console.log(error);
  }
};

// get Single card
module.exports.getcard = async (req, res, next) => {
  try {
    const getcard = await Card.findOne(req.params._id);
    res.status(200).json(getcard);
  } catch (error) {
    console.log(error);
  }
};

// getallcardlist
module.exports.getallcard = async (req, res, next) => {
  try {
    // console.log("hi this is a allcompany");
    const getcard = await Card.find().sort({ _id: -1 });
    res.status(200).json(getcard);
  } catch (error) {
    console.log(error);
  }
};

// Update Card
module.exports.Upadtecard = async (req, res, next) => {
  try {
    const editCard = await Card.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(editCard);
  } catch (err) {
    return console.log(err);
  }
};

// Deletecard

module.exports.deletecard = async (req, res) => {
  try {
    const deletecard = await Card.findByIdAndDelete(req.params.id);
    res.status(200).json("Card has been deleted");
  } catch (err) {
    return console.log(err);
  }
};

// http://localhost:4002/api/users/login
// http://localhost:4002/api/users/register
// http://localhost:4002/api/orders/644779acbf762ce7662b47c6
