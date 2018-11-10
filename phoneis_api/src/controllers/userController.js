// Helper methods
const helpers = require('../config/helpers');
// User model
const User = require('../models/User');

module.exports = (server) => {
  // GET ===>
  // GET all users
  server.get('/users', (req, res, next) => {
    User.find({}, (err, users) => {
      helpers.success(res, next, users);
    });
  });

  // GET user by id
  server.get('/user/:id', (req, res, next) => {
    // // validate non empty id
    // req.assert('id', 'Id is required').notEmpty();
    // const errors = req.validateErrors();
    // if (errors) {
    //   helpers.failure(res, next, errors[0], 400);
    // }

    User.findOne({
      _id: req.params.id,
    }, (err, user) => {
      if (err) {
        helpers.failure(res, next, 'Sommethig went wrong when fetchig user from database', 500);
      }

      if (user === null) {
        helpers.failure(res, next, 'The specified user could not be foind', 404);
      }

      helpers.success(res, next, user);
    });
  });

  // POST ===>
  // crete user
  server.post('/user', (req, res, next) => {
    // req.assert('first_name', 'First name is required').notEmpty();
    // req.assert('last_name', 'Last name is required.').notEmpty();
    // const errors = req.validationErrors();
    // if (errors) {
    //   helpers.failure(res, next, errors, 400);
    // } else {
    const user = new User();
    user.firstName = req.body.first_name;
    user.lastName = req.body.last_name;
    user.save((err) => {
      if (err) {
        helpers.failure(res, next, err, 500);
      }
      helpers.success(res, next, user);
    });
    // }
  });

  // PUT ===>
  // DELETE ===>
};
