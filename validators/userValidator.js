//validators/userValidator.js
const Joi = require("joi");

exports.userValidator = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required(),
  role: Joi.string().valid("admin", "analyst", "viewer").required()
}); 