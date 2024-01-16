const mongoose = require("mongoose");

const TokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.ObjectId,
      ref: "User",
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
TokenSchema.index({ createdOn: 1 }, { expireAfterSeconds: 300 });

const Token = mongoose.model("Token", TokenSchema);

module.exports = Token;
