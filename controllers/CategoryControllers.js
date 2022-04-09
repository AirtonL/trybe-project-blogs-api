const CategoryServices = require('../services/CategoryServices');

const create = async (req, res) => {
  try {
    const { name } = req.body;
    console.log(req.body);

    const newCategory = await CategoryServices.create(name);
    console.log(newCategory);

    return res.status(201).json({ newCategory, name });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  create,
};