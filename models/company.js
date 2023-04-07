const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    companyname: {
      type: String,
      required: true,
      unique: true,
    },
    addressline1: {
      type: String,
    },
    addressline2: {
      type: String,
    },
    ph: {
      type: Number,
      required: true,
    },
    zipcode: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Company", companySchema);
