const { Router } = require('express');

const UserControllers = require('../controllers/UserControllers');

const middleware = require('../middleware');

const router = Router();

router.get('/',
  middleware.checkToken,
  UserControllers.getAll);

router.post('/',
  middleware.checkEmail,
  middleware.checkPassword,
  UserControllers.createUser);

module.exports = router;