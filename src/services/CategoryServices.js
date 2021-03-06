const { Category } = require('../models');

const getAll = async () => {
  try {
    return await Category.findAll();
  } catch (error) {
    console.error(error.message);
  }
};

const getById = async (id) => {
  try {
    return await Category.findByPk(id);
  } catch (error) {
    console.error(error.message);
  }
};

const create = async (name) => {
  try {
    return await Category.create(name);
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = {
  create,
  getAll,
  getById,
};