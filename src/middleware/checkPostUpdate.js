const Joi = require('joi');

const updatePostSchema = Joi.object({
  title: Joi.string()
    .required(),
  content: Joi.string()
    .required(),
  categoryIds: Joi.string()
    .messages({
      'string.base': 'Categories cannot be edited',
    }),
});

module.exports = (req, _res, next) => {
  const { error } = updatePostSchema.validate(req.body);
  if (error) throw error;
  next();
};