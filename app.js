require("dotenv").config();

const express = require("express");
const path = require("node:path");

const indexRouter = require("./routes/indexRouter");

const app = express();
const PORT = process.env.PORT || 3000;

// View engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Middleware untuk membaca data dari form
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", indexRouter);

app.listen(PORT, () => {
  console.log(`Mini Message Board running at http://localhost:${PORT}`);
});
