const { Router } = require('express');

const middleware = require('../middleware');

const PostController = require('../controllers/BlogsPostControllers');

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
  middleware.checkTitle,
  middleware.checkContent,
  PostController.update);

router.post('/',
  middleware.checkToken,
  middleware.checkTitle,
  middleware.checkCategoryIds,
  middleware.checkContent,
  middleware.checkCategories,
  PostController.create);

router.delete('/:id',
  middleware.checkToken,
  PostController.deletePost);

module.exports = router;