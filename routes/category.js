const { Router } = require('express');

const middleware = require('../middleware');

const Categorycontroller = require('../controllers/CategoryControllers');

const router = Router();

router.post('/', 
  middleware.checkToken,
  middleware.checkName,
  Categorycontroller.create);

module.exports = router;