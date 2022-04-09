const { Router } = require('express');

const UserControllers = require('../controllers/UserControllers');

const middleware = require('../middleware');

const router = Router();

router.post('/',
  middleware.checkEmail,
  middleware.checkPassword,
  UserControllers.createUser);

module.exports = router;