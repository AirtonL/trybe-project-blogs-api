const Joi = require('joi');

const categoriesSchema = Joi.object({
  name: Joi.string()
    .min(6)
    .required(),
});

const checkCategory = (req, _res, next) => {
  const { name } = req.body;
  const { error } = categoriesSchema.validate({ name });
  if (error) throw error;
  next();
};

module.exports = checkCategory;