const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
app.use(bodyParser.json());
app.use(cors());
db =
  "mongodb+srv://pavankumarmoka:3ccG3rpxQoWOGEJl@expresscluster.gfleory.mongodb.net/mydb?retryWrites=true&w=majority";
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(console.log(" server is running!"))
  .catch((err) => "error");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: String,
  email: String,
});

const User1 = mongoose.model("User1", userSchema);
app.get("/", async (req, res) => {
  res.json("welcome");
});
app.post("/users", async (req, res) => {
  const { name, email } = req.body;
  try {
    const newUser = new User1({ name, email });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ message: "Error creating user", error: err });
  }
});
app.get("/users", async (req, res) => {
  try {
    const users = await User1.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users", error: err });
  }
});
app.listen(8800, () => {
  console.log("Backend server is running!");
});
