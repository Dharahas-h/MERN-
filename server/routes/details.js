const express = require("express");
const router = express.Router();
const { Student } = require("../models/stModel");

router.get("/", async (req, res) => {
  const stDetails = await Student.find();
  res.send(stDetails);
});

router.post("/", async (req, res) => {
  const len = await Student.count();
  const std = new Student({
    sNo: len + 1,
    rollNo: req.body.rollNo,
    name: req.body.name,
    hostel: req.body.hostel,
    menu: req.body.menu,
    roomNo: req.body.roomNo,
  });

  await std.save();
  res.send(std);
});

module.exports = router;
