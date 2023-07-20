const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

const itemsSchema = new mongoose.Schema({
  name: String,
});
const Item = mongoose.model("Item", itemsSchema);

const todaysDate = () => {
  const today = new Date();
  return today.toDateString();
};

app.get("/", (req, res) => {
  Item.find({}).then((data) => {
    res.render("index", { todaysDate, newListItems: data });
  });
});

app.post("/", (req, res) => {
  const item = req.body.taskInput;
  if (!item) {
    // Input is empty, return without adding the task
    res.redirect("/");
    return;
  }

  const newItem = new Item({
    name: item,
  });

  newItem
    .save()
    .then(() => {
      // Redirect to the GET route to fetch the updated list of items
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err.message);
    });
});

app.post("/delete", (req, res) => {
  const check = req.body.checkbox;
  Item.findByIdAndRemove(check)
    .then(() => {
      res.redirect("/");
      console.log("item removed");
    })
    .catch((err) => {
      console.log(err.message);
    });
});
module.exports = app;
