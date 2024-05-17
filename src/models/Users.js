const {Schema, model} = require("mongoose");

const userSchema = new Schema({
  telegram_id: {
    type: String,
    required: true,
  },
  language: {
    type: String,
  },
  type: {
    type: String,
  },
  category: {
    type: String,
  },
  male: {
    type: String,
  },
});

userSchema.set("timestamps", true);

const Users = model("users", userSchema);

module.exports = Users;