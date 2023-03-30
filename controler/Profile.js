const Profile = require("../models/Profile");

const createprofile = async (req, res) => {
  try {
    const newprofile = await Profile(req.body);
    const saveadd = await newprofile.save();
    res.status(200).json(saveadd);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createprofile };
