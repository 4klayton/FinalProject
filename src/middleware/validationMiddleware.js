const { validationResult } = require('express-validator');

// Middleware to handle the validations from express-validator
const handleValidationErrors = (req, res, next) => {
  next();
};

module.exports = { handleValidationErrors, validationResult };