const { Router } = require('express');

const checkLogin = require('../middleware/checkLogin');

const LoginController = require('../controllers/LoginControllers');

const router = Router();

router.post('/', 
  checkLogin,
  LoginController.login);

module.exports = router;