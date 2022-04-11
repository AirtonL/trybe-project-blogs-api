const { Op } = require('sequelize');
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

const update = async (userId, id, title, content) => {
  const [resultPost] = await BlogPosts.update(
    { title, content },
    { where: { id, userId } },
  );

  return resultPost;
};

const create = async (post) => {
  try {
    return await BlogPosts.create(post);
  } catch (e) {
    console.error(e.message);
  }
};

const deletePost = async (userId, id) => {
  const postExist = await getById(id);

  if (!postExist) return { postNoExist: true };

  if (postExist.userId !== userId) return { unauthorized: true };

  const resultPost = await BlogPosts.destroy({
    where: { id, userId },
  });

  return resultPost;
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
        { model: Category, as: 'categories', through: { attributes: [] },
      },
      ],
    });
  } catch (e) {
    console.error(e.message);
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