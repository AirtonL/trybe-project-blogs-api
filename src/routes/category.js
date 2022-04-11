const { Router } = require('express');

const middleware = require('../middleware');

const Categorycontroller = require('../controllers/CategoryControllers');

const router = Router();

router.get('/',
  middleware.checkToken,
  Categorycontroller.getAll);

router.post('/', 
  middleware.checkToken,
  middleware.checkName,
  Categorycontroller.create);

module.exports = router;