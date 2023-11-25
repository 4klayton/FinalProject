//import
const { body } = require('express-validator');

// validations to check addPost form, before procced to DB
const validateAddPost = [
    body("postTitle", "Post title is mandatory").notEmpty(),
    body("postTitle", "Post title must have at least 3 characters").isLength({ min: 3 }),
    body("postTitle", "Post Title must have letters, numbers, space and hifens only").matches(/^[a-zA-Z0-9\- ]+$/),
    body("postText", "Post text is mandatory").notEmpty(),
    body("postImage").custom((value, { req }) => {
        if (!req.files || !req.files.postImage) {
            throw new Error("Image upload is mandatory");
        }
        return true;
    })
];

// validations to check editPost form, before procced to DB
const validateEditPost = [
    body("postTitle", "Post title is mandatory").notEmpty(),
    body("postTitle", "Post title must have at least 3 characters").isLength({ min: 3 }),
    body("postTitle", "Post Title must have letters, numbers, space and hifens only").matches(/^[a-zA-Z0-9\- ]+$/),
    body("slug", "Slug must have at least 3 characters").isLength({ min: 3 }),
    body("slug", "Slug must have letters, numbers and hifens only").matches(/^[a-zA-Z0-9\-]+$/),
    body("postText", "Post text is mandatory").notEmpty(),
    body("postImage").custom((value, { req }) => {
        if (!req.files || !req.files.postImage) {
            throw new Error("Image upload is mandatory");
        }
        return true;
    })
];

//exporting the validators
module.exports = {
    validateAddPost,
    validateEditPost,
};
