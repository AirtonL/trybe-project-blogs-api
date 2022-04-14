const { User } = require('../models');

const getAll = async () => {
  try {
    return await User.findAll();
  } catch (error) {
    console.error(error.message);
  }
};

const getById = async (id) => {
  try {
    const user = await User.findByPk(id);

    if (!user) return { message: 'User does not exist', userNotExist: true };

    return { user };
  } catch (error) {
    console.error(error.message);
  }
};

const create = async (user) => {
  try {
    const findMail = await User.findOne({
      where: {
        email: user.email,
      },
    });

    if (findMail) return { message: 'User already registered', alreadExist: true };

    const result = await User.create(user);

    return { result };
  } catch (error) {
    console.error(error.message);
  }
};

const deleteUser = async (id) => {
  try {
    const result = await User.destroy({
      where: {
        id,
      },
    });

    return result;
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = {
  create,
  getAll,
  getById,
  deleteUser,
};