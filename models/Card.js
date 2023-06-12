const mongoose = require("mongoose");
const User = require("../models/User");

const CardSchema = new mongoose.Schema(
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
    logo: { type: Buffer },
    countrycode: {
      type: String,
    },
    address: {
      addressline1: {
        type: String,
        trim: true,
        default: "",
      },
      addressline2: {
        type: String,
        trim: true,
        default: "",
      },
      zipcode: {
        type: Number,
      },
      country: {
        type: String,
        trim: true,
        default: "",
      },
    },
    location: [],
    sociallink: [],
    phonenumber: {
      type: Number,
      required: true,
    },
    Website: [],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Card", CardSchema);
