const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    companyname: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      addressline1: {
        type: String,
      },
      addressline2: {
        type: String,
      },
      zipcode: {
        type: Number,
        // required: true,
      },
    },
    ph: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Company", companySchema);
