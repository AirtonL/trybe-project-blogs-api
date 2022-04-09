const { User } = require('../models');
const { checkedAllData } = require('../utils');

const getAll = async () => {
  try {
    return await User.findAll();
  } catch (error) {
    console.error(error.message);
  }
};

const getById = async (id) => {
  try {
    return await User.findByPk(id);
  } catch (error) {
    console.error(error.message);
  }
};

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
  getAll,
  getById,
};