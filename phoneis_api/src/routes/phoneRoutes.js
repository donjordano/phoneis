const { Router } = require('restify-router');
// // const passport = require('passport');
// const { ensureAuthenticated } = require('../utils');

const router = new Router();
const PhoneController = require('../controllers/phoneController');

router.post('', PhoneController.createPhone);
// Demo list
router.post('/store/from/list', PhoneController.storeDemoPhonesList);

// Protected endpoints
router.get('/:id', PhoneController.getPhone);
router.get('/all', PhoneController.listAllPhones);
// Update phone data
router.put('/:id', PhoneController.updatePhone);

// // Authentication mechanism
// router.post('/login', passport.authenticate('local', { successRedirect: '/phones', failureRedirect: '/user/login', failureFlash: true }));
// router.get('/login', UserController.login);

module.exports = router;
