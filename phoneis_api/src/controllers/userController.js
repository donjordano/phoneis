const _ = require('lodash');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { jwtSecret, jwtExpiresIn } = require('../config/config');

// Helper methods
const helpers = require('../config/helpers');
// User model
const User = require('../models/User');
const userService = require('../service/userService');

module.exports = {

  // GET: Listing all users
  listAllUsers: (req, res, next) => {
    User.find({}, (err, users) => {
      helpers.success(res, next, users);
    });
  },

  // GET: Get a specific user by id
  getUser: (req, res, next) => {
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
  },

  // POST: Create a user
  createUser: (req, res, next) => {
    // req.assert('first_name', 'First name is required').notEmpty();
    // req.assert('last_name', 'Last name is required.').notEmpty();
    // const errors = req.validationErrors();
    // if (errors) {
    //   helpers.failure(res, next, errors, 400);
    // } else {
    const {
      firstName,
      lastName,
      email,
      password,
    } = req.body;

    userService.createUser(firstName, lastName, email, password).then((createdUser) => {
      helpers.success(res, next, createdUser);
    }).catch((err) => {
      helpers.failure(res, next, err, 500);
    });
  },

  auth: (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
      if (!_.isEmpty(err) || _.isEmpty(user)) {
        return helpers.failure(res, next, {
          message: 'Something is not right',
          user,
        });
      }

      // generate a signed son web token with the contents of user object and return it in the response
      const token = jwt.sign(user.toJSON(), jwtSecret, { expiresIn: jwtExpiresIn });
      req.login(user, { session: false }, (error) => {
        if (error) {
          return helpers.failure(res, next, error);
        }
      });
      return helpers.success(res, next, { user, token });
    })(req, res, next);
  },

  // PUT ===>
  // DELETE ===>
};
