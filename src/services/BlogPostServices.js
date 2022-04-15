const { Op } = require('sequelize');
const { BlogPosts, User, Category } = require('../models');

const getAll = async () => {
  try {
    const result = await BlogPosts.findAll({
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories' },
      ],
    });

    return result;
  } catch (error) {
    console.error(error.message);
  }
};

const getById = async (id) => {
  try {
    const result = await BlogPosts.findOne({
      where: { id },
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories' },
      ],
    });

    if (!result) return { postNotExist: true, message: 'Post does not exist' };

    return { result };
  } catch (error) {
    console.error(error.message);
  }
};

const update = async (userId, id, title, content) => {
  try {
    const [result] = await BlogPosts.update(
      { title, content },
      { where: { id, userId } },
    );
    
    if (!result) return { unauthorized: true, message: 'Unauthorized user' };

    return result;
  } catch (error) {
    console.error(error.message);
  }
};

const create = async (post) => {
  try {
    return await BlogPosts.create(post);
  } catch (error) {
    console.error(error.message);
  }
};

const deletePost = async (userId, id) => {
  try {
    const { result } = await getById(id);

    if (!result) return { postNoExist: true, message: 'Post does not exist' };

    if (result.userId !== userId) return { unauthorized: true, message: 'Unauthorized user' };

    const resultPost = await BlogPosts.destroy({
      where: { id, userId },
    });

    return resultPost;
  } catch (error) {
    console.error(error.message);
  }
};

const search = async (q) => {
  try {
    return await BlogPosts.findAll({
      where: { [Op.or]: [
        { title: { [Op.like]: `%${q}%` } },
        { content: { [Op.like]: `%${q}%` } },
      ] },
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories' },
      ],
    });
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  deletePost,
  search,
};