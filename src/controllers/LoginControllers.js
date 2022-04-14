const jwt = require('jsonwebtoken');
require('dotenv/config');
const { jwtConfig } = require('../jwtConfigs');
const LoginServices = require('../services/LoginServices');

const SECRET = process.env.JWT_SECRET;

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { notExist, message } = await LoginServices.login(email, password);

    if (notExist) return res.status(400).json({ message });

    const token = jwt.sign({ data: email }, SECRET, jwtConfig);

    return res.status(200).json({ token });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  login,
};