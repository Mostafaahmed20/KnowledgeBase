const express = require("express");
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");
const { default: mongoose } = require("mongoose");
const app = express();
const cors = require("cors");
require("dotenv").config();

mongoose
  .connect(process.env.MONGOURI)
  .then((connection) => console.log("app conected "))
  .catch((err) => console.log(err));
app.use(bodyParser.json());
app.use(cors());
app.use("/item", require("./Api/AdditemApi"));
app.use("/team", require("./Api/Addteam"));
app.use("/Comment", require("./Api/commentAPI"));
app.use(express.static(path.join(__dirname, "/public")));

if (process.env.NODE_ENV === "Production") {
  app.use(express.static(path.join(__dirname, "/myapp/build")));
}

app.get("*", (req, res) => {
  res.setHeader("content-type", "text/html");

  res.sendFile(path.resolve(__dirname, "myapp", "build", "index.html"));
});
console.log(process.env.NODE_ENV);

const Port = process.env.PORT;

app.listen(Port, () => console.log(`app is listen to port ${Port}`));
