const CategoryServices = require('../services/CategoryServices');

const getAll = async (_req, res) => {
  try {
    const categories = await CategoryServices.getAll();

    return res.status(200).json(categories);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: 'Server error' });
  }
};

const create = async (req, res) => {
  try {
    const { name } = req.body;

    const newCategory = await CategoryServices.create(name);

    return res.status(201).json({ newCategory, name });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  create,
  getAll,
};