const { Router } = require('express');

const middleware = require('../middleware');

const checkCategory = require('../middleware/checkCategory');

const Categorycontroller = require('../controllers/CategoryControllers');

const router = Router();

router.get('/',
  middleware.checkToken,
  Categorycontroller.getAll);

router.post('/', 
  middleware.checkToken,
  checkCategory,
  Categorycontroller.create);

module.exports = router;