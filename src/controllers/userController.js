//imports
const user = require("../models/User.js");
const post = require("../models/Post.js")
const app = require("../app.js");

class UserController {

  //this method check if the user and the password are correct. And use express-session to set session of the user
  static async login(req, res) {
    try {
      // even though the controller is related to user collection, the post collection must be access because the Nav of page has information of the posts
      var listPosts = await post.find({});

      var userFound = await user.findOne({ userName: req.body.userName });
      if (userFound.userName === req.body.userName && userFound.userPassword === req.body.userPassword) {
        const confirmation = { h1: "Welcome", h2: `Hello <span class="userNameLoginMessage">${userFound.userName}</span>, Welcome to the dashboard!` }

        //express-session properties
        req.session.userName = userFound.userName;
        req.session.authorized = true;
        
        var authorized = req.session.authorized;
        res.status(200).render("actionConfirmation", { confirmation, listPosts, authorized });
      } else {
        throw new Error("User not found or wrong password");
      }
    } catch (e) {
      const confirmation = { h1: "Error", h2: "User not found or wrong password" }
      const tryAgain = true;
      res.status(400).render("actionConfirmation", { confirmation, listPosts, authorized, tryAgain });
    }
  }

}

//export the controller
module.exports = UserController;