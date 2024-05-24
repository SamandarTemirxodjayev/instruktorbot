const {Schema, model} = require("mongoose");

const driverSchema = new Schema({
  type: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  male: {
    type: String,
    required: true
  },
  staj: {
    type: Number,
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  someDetails: {
    type: String
  },
});

driverSchema.set("timestamps", true);

const Drivers = model("drivers", driverSchema);

module.exports = Drivers;