const express = require("express");
const cors = require("cors");
const { Student } = require("./models/stModel");
const mongoose = require("mongoose");
const app = express();
const { User } = require("./models/stUser");
const jwt = require("jsonwebtoken");

app.use(cors());
app.use(express.json());
const db = process.env.app_db;

mongoose.connect(db);

app.get("/stdetails", async (req, res) => {
  const details = await Student.find();
  res.send(details);
});

app.post("/stdetails", async (req, res) => {
  const details = new Student({
    rollNo: req.body.rollNo,
    name: req.body.name,
    hostel: req.body.hostel,
    menu: req.body.menu,
    roomNo: req.body.roomNo,
  });

  await details.save();
  res.send(details);
  console.log(req.body);
});

app.post("/auth", async (req, res) => {
  const user = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });

  console.log(user);

  if (user) {
    const token = jwt.sign(
      { _id: user._id, username: user.username },
      "secret123"
    );
    res
      .header("x-auth-token", token)
      .header("access-control-expose-headers", "x-auth-token")
      .send(user);
  } else {
    return res.json({ status: "error" });
  }
});

app.post("/register", async (req, res) => {
  const user = await User.findOne({
    username: req.body.username,
  });

  if (user) return res.status(400).send("User already registered");

  const newUser = new User({
    username: req.body.username,
    password: req.body.password,
  });
  console.log(req.body);
  const j = jwt.sign({ username: req.body.username }, "secret5");

  await newUser.save();
  res
    .header("x-auth-token", j)
    .header("access-control-expose-headers", "x-auth-token")
    .send(newUser);
});

app.delete("/stdetails/:rollNo", async (req, res) => {
  try {
    const detail = await Student.findOneAndDelete({
      rollNo: req.params.rollNo,
    });
    res.send(detail);
  } catch (err) {
    console.log(err);
  }
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`listening on ${port}...`);
});
