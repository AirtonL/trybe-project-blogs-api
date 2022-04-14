require('dotenv/config');
const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../jwtConfigs');
const UserService = require('../services/UserServices');

const getAll = async (_req, res) => {
  try {
    const result = await UserService.getAll();

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const { user, userNotExist, message } = await UserService.getById(id);

    if (userNotExist) return res.status(404).json({ message });

    return res.status(200).json(user);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: 'Server error' });
  }
};

const createUser = async (req, res) => {
  try {
  const { message, result, alreadExist } = await UserService.create(req.body);

  if (alreadExist) return res.status(409).json({ message });

  const token = jwt.sign({ data: result.email }, process.env.JWT_SECRET, jwtConfig);

  return res.status(201).json({ token });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: 'Server error' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await UserService.deleteUser(id);

    return res.status(204).end();
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createUser,
  getAll,
  getById,
  deleteUser,
};