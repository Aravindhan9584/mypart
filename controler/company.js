const Company = require("../models/company");
// const createError = require("../utility/createError");

// createcompany
module.exports.createcompany = async (req, res) => {
  try {
    const newcompany = await Company(req.body);
    const savecompany = await newcompany.save();
    res.status(200).json("new company created");
  } catch (error) {
    console.log(error);
  }
};

// get Single company
module.exports.getcompany = async (req, res, next) => {
  try {
    const getcompany = await Company.findOne(req.params._id);
    res.status(200).json(getcompany);
  } catch (error) {
    console.log(error);
  }
};

// getallcompanylist
module.exports.getallcompany = async (req, res, next) => {
  try {
    // console.log("hi this is a allcompany");
    const getcompany = await Company.find().sort({ _id: -1 });
    res.status(200).json(getcompany);
  } catch (error) {
    console.log(error);
  }
};
// .sort({ _id: -1 })
// Update Company

module.exports.Upadtecompany = async (req, res, next) => {
  try {
    const editCompany = await Company.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(editCompany);
  } catch (err) {
    return console.log(err);
  }
};

module.exports.deletecompany = async (req, res) => {
  try {
    const deletedcompany = await Company.findByIdAndDelete(req.params.id);
    res.status(200).json("Company has been deleted");
  } catch (err) {
    return console.log(err);
  }
};
