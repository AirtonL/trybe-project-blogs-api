const { Router } = require('express');

const UserControllers = require('../controllers/UserControllers');

const middleware = require('../middleware');

const router = Router();

router.get('/',
  middleware.checkToken,
  UserControllers.getAll);

router.get('/:id',
  middleware.checkToken,
  UserControllers.getById);

router.post('/',
  middleware.checkEmail,
  middleware.checkPassword,
  UserControllers.createUser);

router.delete('/me',
  middleware.checkToken,
  UserControllers.deleteUser);

module.exports = router;