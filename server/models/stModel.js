const mongoose = require("mongoose");

const stSchema = new mongoose.Schema(
  {
    rollNo: { type: String, required: true },
    name: { type: String, required: true },
    hostel: { type: String, required: true },
    menu: { type: String, requird: true },
    roomNo: { type: Number },
  },
  { collection: "stDetails" }
);
const Student = mongoose.model("Student", stSchema);

exports.Student = Student;
