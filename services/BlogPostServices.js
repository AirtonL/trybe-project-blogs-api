const { BlogPosts, User, Category } = require('../models');

const getAll = async () => {
  try {
    return await BlogPosts.findAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: { exclude: ['password'] },
        },
        {
        model: Category,
        as: 'categories',
        through: { attributes: [] },
      },
      ],
    });
  } catch (e) {
    console.error(e.message);
  }
};

const getById = async (id) => {
  try {
    return await BlogPosts.findOne({
      where: { id },
      include: [
        { model: User,
          as: 'user',
          attributes: { exclude: ['password'] },
        },
        {
        model: Category,
        as: 'categories',
        through: { attributes: [] },
      },
      ],
    });
  } catch (e) {
    console.error(e.message);
  }
};

const create = async (post) => {
  try {
    return await BlogPosts.create(post);
  } catch (e) {
    console.error(e.message);
  }
};

module.exports = {
  create,
  getAll,
  getById,
};