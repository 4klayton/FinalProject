//import
const express = require("express");
const PostController = require("../controllers/postController.js");
const UserController = require("../controllers/userController.js");
const { validateAddPost, validateEditPost } = require("../middleware/validations.js");
const { handleValidationErrors } = require("../middleware/validationMiddleware.js");
const routes = express.Router();

//setting the routes, validations and handlers for posts
routes.get("/admin", PostController.loginPage);
routes.get("/logout", PostController.logout);
routes.get("/singlePost/:slug", PostController.printSinglePost);
routes.get("/:pageToRender", PostController.retrievePosts);
routes.post("/addPost", validateAddPost, handleValidationErrors, PostController.addPost);
routes.get("/editPost/:slug", PostController.findAndLoadPostToEdit);
routes.post("/editPost/:slug", validateEditPost, handleValidationErrors, PostController.updatePost);
routes.get("/deletePost/:slug", PostController.deletePost);

//setting the routes and handler for users
routes.post("/login", UserController.login);

//export
module.exports = routes;


