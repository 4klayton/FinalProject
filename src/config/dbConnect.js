//configuration using mongoose to connect to mongoDB

const mongoose = require("mongoose");

//async
function connectDB() {
    //await
    mongoose.connect("mongodb://localhost:27017/easycook").then(
        function(){console.log("DB connection successfully")}
    ).catch(
        function(error){console.log("DB was not conect" + error)}
    );
    return mongoose.connection;
};

module.exports = connectDB;
