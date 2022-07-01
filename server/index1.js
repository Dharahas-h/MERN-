const express = require("express");
const app = express();
const details = require("./routes/details");
const user = require("./routes/user");
const cors = require("cors");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/mydb");

app.use(cors());
app.use(express.json());

app.use("/stdetails", details);
app.use("/user", user);

app.listen(3100, () => {
  console.log("listening on 3100...");
});
