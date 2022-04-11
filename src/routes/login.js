const { Router } = require('express');

const middleware = require('../middleware');

const LoginController = require('../controllers/LoginControllers');

const router = Router();

router.post('/', 
  middleware.checkEmail,
  middleware.checkPassword,
  middleware.checkBlankField,
  LoginController.login);

module.exports = router;