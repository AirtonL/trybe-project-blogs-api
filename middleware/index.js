const { existField } = require('../utils');

const checkEmail = (req, res, next) => {
  const { email } = req.body;
  const { isExist, message } = existField({ email });

  if (isExist) return res.status(400).json({ message });

  next();
};

const checkPassword = (req, res, next) => {
  const { password } = req.body;
  const { isExist, message } = existField({ password });

  if (isExist) return res.status(400).json({ message });

  next();
};

module.exports = {
  checkEmail,
  checkPassword,
};