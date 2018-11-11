const { Router } = require('restify-router');
const { ensureAuthenticated } = require('../utils');

const router = new Router();
const UserController = require('../controllers/userController.js');

router.post('', UserController.createUser);

// Protected endpoints
router.get('/:id', UserController.getUser);
router.get('/all', ensureAuthenticated, UserController.listAllUsers);

// Authentication mechanism
router.post('/auth', UserController.auth);

module.exports = router;
