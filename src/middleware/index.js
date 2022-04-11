require('dotenv/config');
const jwt = require('jsonwebtoken');
const { existField } = require('../utils');
const { User } = require('../models');
const CategoryServices = require('../services/CategoryServices');

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

const checkTitle = (req, res, next) => {
  const { title } = req.body;
  const { isExist, message } = existField({ title });

  if (isExist) return res.status(400).json({ message });
  next();
};

const checkCategoryIds = (req, res, next) => {
  const { categoryIds } = req.body;
  const { isExist, message } = existField({ categoryIds });

  if (isExist) return res.status(400).json({ message });
  next();
};

const checkContent = (req, res, next) => {
  const { content } = req.body;
  const { isExist, message } = existField({ content });

  if (isExist) return res.status(400).json({ message });
  next();
};

const verifyValues = async (categoryIds, ids) => Promise.all(ids)
  .then((id) => {
    const arr = id.map((i) => (i && i.dataValues.id));
  
    return !categoryIds.every((idCategory) => arr.includes(idCategory));
  });

const checkCategories = async (req, res, next) => {
  const { categoryIds } = req.body;

  const ids = categoryIds.map((i) => CategoryServices.getCategoryById(i));

  const notValueId = await verifyValues(categoryIds, ids);
  if (notValueId) return res.status(400).json({ message: '"categoryIds" not found' });

  next();
};

module.exports = {
  checkEmail,
  checkPassword,
  checkBlankField,
  checkToken,
  checkName,
  checkTitle,
  checkCategoryIds,
  checkContent,
  checkCategories,
};