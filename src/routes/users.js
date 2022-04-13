const { Router } = require('express');

const UserControllers = require('../controllers/UserControllers');

const middleware = require('../middleware');

const checkUser = require('../middleware/checkUser');

const router = Router();

router.get('/',
  middleware.checkToken,
  UserControllers.getAll);

router.get('/:id',
  middleware.checkToken,
  UserControllers.getById);

router.post('/',
  checkUser,
  UserControllers.createUser);

router.delete('/me',
  middleware.checkToken,
  UserControllers.deleteUser);

module.exports = router;