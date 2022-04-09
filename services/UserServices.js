const { User } = require('../models');
const { checkedAllData } = require('../utils');

const create = async (user) => {
  try {
    const findMail = await User.findAll({
      where: {
        email: user.email,
      },
    });

    if (findMail.length > 0) return { message: 'User already registered', emailExist: true };
    
    const validData = await checkedAllData(user);

    if (validData) return validData;

    const result = await User.create(user);

    return { result };
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = {
  create,
};