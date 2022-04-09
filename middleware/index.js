require('dotenv/config');
const jwt = require('jsonwebtoken');
const { existField } = require('../utils');
const { User } = require('../models');

const SECRET = process.env.JWT_SECRET;

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

const checkBlankField = (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password);
  const type = email ? 'password' : 'email';
  
  if (!(email.length) || !(password.length)) {
    return res.status(400).json({
      message: `"${type}" is not allowed to be empty` });
  }

  next();
};

const checkToken = async (req, res, next) => {
  const { authorization: token } = req.headers;
  if (!token) return res.status(401).json({ message: 'Token not found' });
  try {
    const { data } = jwt.verify(token, SECRET);
    // console.log('teste:', teste);
    console.log('cheguei');
    const [user] = await User.findAll({
      where: { email: data },
    });
    if (!user) return res.status(401).json({ message: 'Expired or invalid token' });

    req.user = user;
    next();
  } catch (e) {
    console.error(e.message);
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

const checkName = (req, res, next) => {
  const { name } = req.body;
  const { isExist, message } = existField({ name });

  if (isExist) return res.status(400).json({ message });
  next();
};

module.exports = {
  checkEmail,
  checkPassword,
  checkBlankField,
  checkToken,
  checkName,
};