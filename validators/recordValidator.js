//validators/recordValidator.js
const Joi = require("joi");

exports.recordValidator = Joi.object({
  amount: Joi.number().required(),
  type: Joi.string().valid("income", "expense").required(),
  category: Joi.string().required(),
  date: Joi.date().required(),
  notes: Joi.string().allow("")
}); 