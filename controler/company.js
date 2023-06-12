const Company = require("../models/company");
const { createError } = require("../utility/createError");
const User = require("../models/User");

// createcompany
// module.exports.createcompany = async (req, res, next) => {
//   try {
//     const { companyname } = req.body;
//     const existingcompany = await Company.findOne({ companyname: companyname });
//     if (existingcompany) {
//       return next(createError(404, "company Already Existing"));
//     }
//     const newcompany = await Company(req.body);
//     const savecompany = await newcompany.save();
//     res.status(200).json(next(createError(200, "new company created")));
//   } catch (error) {
//     console.log(error);
//   }
// };

module.exports.createcompany = async (req, res, next) => {
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
    console.log(user);
    const newcompany = await Company(req.body, { createdBy: user });
    console.log(newcompany);
    // const  = await Card(req.body);
    const savecompany = await newcompany.save();
    res
      .status(200)
      // .json(next(createError(200, "New Company created")))
      .json(savecompany);
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

// Deletecompany

module.exports.deletecompany = async (req, res) => {
  try {
    const deletedcompany = await Company.findByIdAndDelete(req.params.id);
    res.status(200).json("Company has been deleted");
  } catch (err) {
    return console.log(err);
  }
};
