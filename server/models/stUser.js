const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { collection: "users" }
);

const User = mongoose.model("User", userSchema);

function generateToken(user) {
  const jt = jwt.sign({ _id: user._id, username: user.username }, "secret123");
  return jt;
}

exports.User = User;
exports.generateToken = generateToken;
