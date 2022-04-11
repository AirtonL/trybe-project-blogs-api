const BlogPostServices = require('../services/BlogPostServices');

const getAll = async (_req, res) => {
  try {
    const result = await BlogPostServices.getAll();
  
    return res.status(200).json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await BlogPostServices.getById(id);

    if (!result) return res.status(404).json({ message: 'Post does not exist' });

    return res.status(200).json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { id: userId } = req.user;
    const { title, content, categoryIds } = req.body;
    console.log('entrei');

    if (categoryIds) {
      return res.status(400).json({ message: 'Categories cannot be edited' });
    }

    const result = await BlogPostServices.update(userId, id, title, content);

    if (!result) return res.status(401).json({ message: 'Unauthorized user' });

    const postUpdate = await BlogPostServices.getById(id);

    return res.status(200).json(postUpdate);
  } catch (error) {
    console.log('entrei');
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

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
  getAll,
  getById,
  update,
};