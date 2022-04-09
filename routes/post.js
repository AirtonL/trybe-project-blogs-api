const { Router } = require('express');

const middleware = require('../middleware');

const PostController = require('../controllers/BlogsPostControllers');

const router = Router();

router.post('/',
  middleware.checkToken,
  middleware.checkTitle,
  middleware.checkCategoryIds,
  middleware.checkContent,
  middleware.checkCategories,
  PostController.create);

module.exports = router;