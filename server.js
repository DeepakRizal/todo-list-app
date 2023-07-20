const app = require("./app");
const dotenv = require("dotenv");

const mongoose = require("mongoose");
dotenv.config({ path: "./config.env" });

mongoose.connect(process.env.MONGO_DB).then(() => {
  console.log("successfully connected to db");
});

app.listen(3000, (req, res) => {
  console.log("hello from the server");
});
