const { BlogPosts } = require('../models');

const create = async (post) => {
  try {
    return await BlogPosts.create(post);
  } catch (e) {
    console.error(e.message);
  }
};

module.exports = {
  create,
};