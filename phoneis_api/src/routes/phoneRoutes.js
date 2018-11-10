const { Router } = require('restify-router');
// // const passport = require('passport');
// const { ensureAuthenticated } = require('../utils');

const router = new Router();
// const PhoneController = require('../controllers/phoneController.js');

// Use UserController as an example to define those functions
// router.post('/', UserController.createUser);

// // Protected endpoints
// router.get('/:id', UserController.getUser);
// router.get('/all', UserController.listAllUsers);

// // Authentication mechanism
// router.post('/login', passport.authenticate('local', { successRedirect: '/phones', failureRedirect: '/user/login', failureFlash: true }));
// router.get('/login', UserController.login);

module.exports = router;
