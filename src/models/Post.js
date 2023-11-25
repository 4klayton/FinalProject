//import
const mongoose = require("mongoose");

//schema to create the model of each post
const postSchema = new mongoose.Schema({
    id: {type: mongoose.Schema.Types.ObjectId},
    postTitle: {type: String, required: true},
    slug: {type: String, required: true, unique: true},
    postImageName: {type: String, required: true},
    postText: {type: String, required: true},
    postDate: {type: Date, require: true}
}, {versionKey: false});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;



// const mongoose = require("mongoose");
// const fileUpload = require('express-fileupload');

// const cupSchema = new mongoose.Schema({
//     id: {type: mongoose.Schema.Types.ObjectId},
//     postTitle: {type: String, required: true},
//     slug: {type: String, required: true, unique: true},
//     postImageName: {type: String, required: true},
//     postText: {type: String, required: true},
//     postDate: {type: Date, require: true}
// }, {versionKey: false});

// const Cup = mongoose.model("Cup", cupSchema);

// module.exports = Cup;