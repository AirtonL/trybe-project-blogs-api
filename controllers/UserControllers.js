const UserService = require('../services/UserServices');

const createUser = async (req, res) => {
  try {
  const { message, result, emailExist } = await UserService.create(req.body);
  if (message) {
    if (emailExist) return res.status(409).json({ message });
    return res.status(400).json({ message });
  }

  return res.status(201).json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createUser,
};