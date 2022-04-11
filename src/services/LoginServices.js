const { User } = require('../models');

const login = async (email, password) => {
  const [user] = await User.findAll({
    where: {
      email,
    },
  });

  if (!user || user.password !== password) {
    return { notExist: true };
  }

  return user;
};

module.exports = {
  login,
};