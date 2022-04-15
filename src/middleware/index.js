require('dotenv/config');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const CategoryServices = require('../services/CategoryServices');

const SECRET = process.env.JWT_SECRET;

const checkToken = async (req, res, next) => {
  const { authorization: token } = req.headers;
  if (!token) return res.status(401).json({ message: 'Token not found' });
  try {
    const { data } = jwt.verify(token, SECRET);

    const user = await User.findOne({
      where: { email: data },
    });
    if (!user) return res.status(401).json({ message: 'Expired or invalid token' });

    req.user = user;
    next();
  } catch (error) {
    console.error(error.message);
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

const verifyValues = async (ids) => Promise.all(ids)
  .then((id) => id.map((i) => (!!i))
    .some((v) => v === false));

const checkCategories = async (req, res, next) => {
  try {
    const { categoryIds } = req.body;

    const ids = categoryIds.map((i) => CategoryServices.getById(i));

    const notValueId = await verifyValues(ids);
    if (notValueId) return res.status(400).json({ message: '"categoryIds" not found' });

    next();
  } catch (error) {
    console.error(error.message);
    return res.status(401).json({ message: 'Server Error' });
  }
};

module.exports = {
  checkToken,
  checkCategories,
};