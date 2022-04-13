const Joi = require('joi');

const loginSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  password: Joi.string()
    .min(6)
    .messages({
      'string.min': '"password" length must be 6 characters long',
    })
    .required(),
});

module.exports = (req, _res, next) => {
  const { error } = loginSchema.validate(req.body);
  if (error) throw error;
  next();
};
