const Joi = require('joi');

const createPostSchema = Joi.object({
  title: Joi.string()
    .required(),
  content: Joi.string()
    .required(),
  categoryIds: Joi.array()
    .required(),
});

module.exports = (req, _res, next) => {
  const { error } = createPostSchema.validate(req.body);
  if (error) throw error;
  next();
};