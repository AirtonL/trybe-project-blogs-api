const BlogPostServices = require('../services/BlogPostServices');

const create = async (req, res) => {
  try {
    const { id } = req.user;
    console.log(req.body);

    const newBlogPost = { ...req.body, userId: id, published: new Date(), updated: new Date() };

    const newPost = await BlogPostServices.create(newBlogPost);

    return res.status(201).json(newPost);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  create,
};