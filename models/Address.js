const mongoose = require("mongoose");
const User = require("./User");

const addressSchema = new mongoose.Schema(
  {
    userId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zip: {
      type: String,
      required: true,
    },
  },
  { timeseries: true }
);

module.exports = mongoose.model("Address", addressSchema);
