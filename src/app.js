//import
const express = require("express");
const connectDB = require("./config/dbConnect.js");
const routes = require("./routes/index.js");
const fileUpload = require("express-fileupload");
const path = require("path");
const session = require("express-session");

//app instance
const app = express();

// initial settings of express-session
app.use(session({
    secret: "key that will sign cookie",
    resave: false,
    saveUninitialized: false,
}));

// app setting
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "../public")))
app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));

//calling the mongoose config function
connectDB();

//calling routes and passing the app to apply the settings
routes(app);

//export
module.exports = app;