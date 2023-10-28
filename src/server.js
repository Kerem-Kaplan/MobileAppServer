require("dotenv").config();
const express = require("express");
const userRoutes = require("./routes/userRoutes");
const observerRoutes = require("./routes/observerRoutes");
const loginRoutes = require("./routes/loginRoutes");
const bodyParser = require("body-parser");

const port = process.env.PORT;
const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use("/", loginRoutes);
app.use("/user", userRoutes);
app.use("/observer", observerRoutes);

app.listen(port, () => {
  console.log(`Server Started at ${port}`);
});
