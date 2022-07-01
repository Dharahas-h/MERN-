const express = require("express");
const router = express.Router();
const { User, generateToken } = require("../models/stUser");

router.post("/auth", (req, res) => {
  const user = User.findOne({
    username: req.body.username,
    password: req.body.password,
  });

  if (user) {
    const token = generateToken(user);
    res
      .header("x-auth-token", token)
      .header("access-control-expose-headers", "x-auth-token")
      .send(user);
  } else {
    res.status(400).send("User not registered");
  }
});

router.post("/register", async (req, res) => {
  const us = User.findOne({
    username: req.body.username,
    password: req.body.password,
  });
  console.log(us);
  if (us) return res.status(400).send("User already registerd");

  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });
  await user.save();

  const token = generateToken(user.username);
  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(user);
});

module.exports = router;
