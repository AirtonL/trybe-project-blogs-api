require('dotenv/config');
const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../jwtConfigs');
const UserService = require('../services/UserServices');

const getAll = async (_req, res) => {
    const result = await UserService.getAll();

    return res.status(200).json(result);
};

const createUser = async (req, res) => {
  try {
  const { message, result, emailExist } = await UserService.create(req.body);
  if (message) {
    if (emailExist) return res.status(409).json({ message });
    return res.status(400).json({ message });
  }

  const token = jwt.sign({ data: result.email }, process.env.JWT_SECRET, jwtConfig);

  return res.status(201).json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createUser,
  getAll,
};