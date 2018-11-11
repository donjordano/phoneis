const { Router } = require('restify-router');
const passport = require('passport');
const { ensureAuthenticated } = require('../utils');

const router = new Router();
const PhoneController = require('../controllers/phoneController');
const UserController = require('../controllers/userController.js');

router.post('', PhoneController.createPhone);
// Demo list
router.post('/store/from/list', PhoneController.storeDemoPhonesList);

// Protected endpoints
router.get('/:id', PhoneController.getPhone);
router.get('/all', ensureAuthenticated, PhoneController.listAllPhones);
// Update phone data
router.put('/:id', PhoneController.updatePhone);

// Authentication mechanism
router.post('/login', passport.authenticate('local', {
  // TODO: this need to be refactored!
  successRedirect: '/phones',
  failureRedirect: '/user/auth',
  failureFlash: true,
}));

router.get('/login', UserController.login);

module.exports = router;
