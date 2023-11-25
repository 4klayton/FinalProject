const mongoose = require("mongoose");

//schema to create the model of each user
const userSchema = new mongoose.Schema({
    id: {type: mongoose.Schema.Types.ObjectId},
    userName: {type: String, required: true, unique: true},
    userPassword: {type: String, required: true}
}, {versionKey: false});

const User = mongoose.model("User", userSchema);

module.exports = User;