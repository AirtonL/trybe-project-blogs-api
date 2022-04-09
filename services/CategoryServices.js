const { Category } = require('../models');

const create = async (name) => {
  const result = await Category.create(name);
  return result;
};

module.exports = {
  create,
};