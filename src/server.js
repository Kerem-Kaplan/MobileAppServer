require("dotenv").config();
const express = require("express");
const userRoutes = require("./routes/userRoutes");
const observerRoutes = require("./routes/observerRoutes");
const loginRoutes = require("./routes/loginRoutes");
const bodyParser = require("body-parser");
const database = require("./config/database");
const cors = require("cors");
const path = require("path");

const port = process.env.PORT;
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use("/", loginRoutes);
app.use("/user", userRoutes);
app.use("/observer", observerRoutes);

database.connect();
app.listen(port, () => {
  console.log(`Server Started at ${port}`);
});
