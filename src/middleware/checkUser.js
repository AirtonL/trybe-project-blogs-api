const Joi = require('joi');

const userSchema = Joi.object({
  displayName: Joi.string()
    .min(8)
    .required(),
  password: Joi.string()
    .min(6)
    .messages({
      'string.min': '"password" length must be 6 characters long',
    })
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  image: Joi.string()
    .required(),
});

module.exports = (req, _res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) throw error;
  next();
};
