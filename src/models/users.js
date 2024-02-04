const mongoose = require("mongoose");
const { boolean } = require("zod");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    profile_pic: {
      type: String,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    category: {
      type: [String],
      default: ["others"],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
