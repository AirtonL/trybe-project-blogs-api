const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../jwtConfigs');
const LoginServices = require('../services/LoginServices');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await LoginServices.login(email, password);

    if (user.notExist) return res.status(400).json({ message: 'Invalid fields' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, jwtConfig);

    return res.status(200).json({ token });
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  login,
};