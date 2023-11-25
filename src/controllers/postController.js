//imports
const post = require("../models/Post");
const app = require("../app.js");
const path = require("path");
const ValidationErrors = require("../middleware/validationMiddleware.js")

class PostController {

//this method handle the routes that request to show a especific post
  static async printSinglePost(req, res) {
    try {
      var authorized = req.session.authorized;
      const slug = req.params.slug;
      var listPosts = await post.find({});
      var postFound = await post.findOne({ slug : slug });
      //if everything is fine, shows a page with the post content
      res.status(200).render("singlePost", { postFound, listPosts, slug });
    } catch (e) {
      const confirmation = { h1: "Error", h2: `${e.message}` }
      //if something got wrong, shows a page with the description of the error
      res.status(500).render("actionConfirmation", { confirmation , listPosts, authorized });
    }
  }

  //this method handle the route that request all post to present in a single page
  static async retrievePosts(req, res) {
    try {
      var authorized = req.session.authorized;
      const pageToRender = req.params.pageToRender;
      var listPosts = await post.find({});
      //if everything is fine, shows a page with the post content
      res.status(200).render(`${pageToRender}`, { listPosts });
    } catch (e) {
      const confirmation = { h1: "Error", h2: `${e.message}` }
      res.status(500).render("actionConfirmation", { confirmation , listPosts, authorized });
    }
  }

    //this method handle the route that check the session and presents the login page
  static async loginPage(req, res) {
    try {
      var authorized = req.session.authorized;
      var listPosts = await post.find({});
      if (req.session.authorized) {
        res.status(200).render("listPostAdmin", { listPosts });
      } else {
        res.status(400).render("admin", { listPosts });
      }
    } catch (e) {
      const confirmation = { h1: "Error", h2: `${e.message}` }
      res.status(500).render("actionConfirmation", { confirmation , listPosts, authorized});
    }
  }

 //this method handle the route that request user logout
  static async logout(req, res) {
    var listPosts = await post.find({});
    req.session.destroy();
    res.status(200).render("admin", { listPosts });
  }
 
  //this method handle the information captured from the form and storage the information into DB
  static async addPost(req, res) {
    try {
      var authorized = req.session.authorized;
      var listPosts = await post.find({});
      //this part check if there is error (using the express-validatior middleware)
      const validationErrors = ValidationErrors.validationResult(req).array();
      if (validationErrors.length > 0) {
        const errorMessageString = validationErrors.map(error => error.msg).join("<br>");
        throw new Error(errorMessageString);
      }

      //this part prepare the data to be in the same format of the DB
      var postTitle = req.body.postTitle;
      var postText = req.body.postText;
      var slug = postTitle.replace(/ /g, "-");
      var postImageName = Date.now() + path.extname(req.files.postImage.name);
      var postImageFile = req.files.postImage;
      var postImagePath = "public/uploads/" + postImageName;
      var postDate = Date.now();
      await postImageFile.mv(postImagePath, function (error) {
        console.log(error);
      });
      var postData = {
        postTitle: postTitle,
        slug: slug,
        postImageName: postImageName,
        postText: postText,
        postDate: postDate
      }

      //save into the DB
      await post.create(postData);
      const confirmation = { h1: "Add new Post", h2: "You have successfully create a new post!" }
      res.status(200).render("actionConfirmation", { confirmation , listPosts, authorized });
    } catch (e) {
      const confirmation = { h1: "Add new Post", h2: `Fail to add post - ${e.message}` }
      res.status(400).render("actionConfirmation", { confirmation , listPosts, authorized });
    }
  }

  //this method handle the route that request all post to be showed in a list and after a page with edit and delete options
  static async findAndLoadPostToEdit(req, res) {
    try {
      var authorized = req.session.authorized;
      var listPosts = await post.find({});
      const slug = req.params.slug;
      const postFound = await post.findOne({slug : slug});
      res.status(200).render("editPost", { postFound, listPosts });
    } catch (e) {
      const confirmation = { h1: "Edit Post", h2: `Fail to list the selected post - ${e.message}` }
      res.status(500).render("actionConfirmation", { confirmation , listPosts, authorized });
    }
  }

   //this method handle the information captured from the edit form and updated the post information into DB
  static async updatePost(req, res) {
    try {
      var authorized = req.session.authorized;
      var listPosts = await post.find({});
       //this part check if there is error (using the express-validatior middleware)
      const validationErrors = ValidationErrors.validationResult(req).array();
      if (validationErrors.length > 0) {
        const errorMessageString = validationErrors.map(error => error.msg).join("<br>");
        throw new Error(errorMessageString);
      }

      //this part prepare the data to be in the same format of the DB
      var postTitle = req.body.postTitle;
      var slug = req.body.slug;
      var postText = req.body.postText;
      var postImageName = Date.now() + path.extname(req.files.postImage.name);
      var postImageFile = req.files.postImage;
      var postImagePath = "public/uploads/" + postImageName;
      await postImageFile.mv(postImagePath, function (error) {
        console.log(error);
      });
      var postData = {
        postTitle: postTitle,
        slug: slug,
        postImageName: postImageName,
        postText: postText
      }

      //update the DB
      await post.findOneAndUpdate({slug : req.params.slug}, postData);
      const confirmation = { h1: "Post Updated", h2: "You have successfully updated the selected post!" }
      res.status(200).render("actionConfirmation", { confirmation , listPosts, authorized });
    } catch (e) {
      const confirmation = { h1: "Edit Post", h2: `Fail to update the post - ${e.message}` }
      res.status(400).render("actionConfirmation", { confirmation , listPosts, authorized });
    }
  }

  //this method handle the route that request to delete a post from the DB
  static async deletePost(req, res) {
    try {
      var authorized = req.session.authorized;
      var listPosts = await post.find({});

      //use the slug to find the post then delete from DB
      const slug = req.params.slug;
      await post.findOneAndDelete({ slug : slug });

      //shows the confirmation page, with success or error message
      const confirmation = { h1: "Post Deleted", h2: "You have successfully delete the selected post." }
      res.status(200).render("actionConfirmation", { confirmation , listPosts, authorized });
    } catch (e) {
      const confirmation = { h1: "Delete Post", h2: `Fail to delete the post - ${e.message}` }
      res.status(500).render("actionConfirmation", { confirmation , listPosts, authorized });
    }
  }

};

//export the controller
module.exports = PostController;