const { Router } = require('express');

const middleware = require('../middleware');

const PostController = require('../controllers/BlogsPostControllers');

const router = Router();

router.get('/',
  middleware.checkToken,
  PostController.getAll);

router.get('/:id',
  middleware.checkToken,
  PostController.getById);  

router.post('/',
  middleware.checkToken,
  middleware.checkTitle,
  middleware.checkCategoryIds,
  middleware.checkContent,
  middleware.checkCategories,
  PostController.create);

module.exports = router;