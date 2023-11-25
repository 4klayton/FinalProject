//import
const express = require("express");
const posts = require("./routes");

//setting the app to use express.json with the routes definition
const routes = (app) => {
    app.route("/index").get((req, res) => res.status(200).redirect("/singlePost/slug"));
    app.use(express.json(), posts);
}

//export
module.exports = routes;