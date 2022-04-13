const { Router } = require('express');

const middleware = require('../middleware');

const PostController = require('../controllers/BlogsPostControllers');

const checkPostUpdate = require('../middleware/checkPostUpdate');

const checkCreatePost = require('../middleware/checkCreatePost');

const router = Router();

router.get('/',
  middleware.checkToken,
  PostController.getAll);

router.get('/search',
  middleware.checkToken,
  PostController.search);

router.get('/:id',
  middleware.checkToken,
  PostController.getById);

router.put('/:id',
  middleware.checkToken,
  checkPostUpdate,
  PostController.update);

router.post('/',
  middleware.checkToken,
  checkCreatePost,
  middleware.checkCategories,
  PostController.create);

router.delete('/:id',
  middleware.checkToken,
  PostController.deletePost);

module.exports = router;