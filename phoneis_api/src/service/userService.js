const _ = require('lodash');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { saltRounds } = require('../config/config');

async function createUser(firstName, lastName, email, password) {
  // Validation

  // Empty password
  if (_.isEmpty(password)) {
    throw Error('Your password should not be empty.');
  }

  if (_.isEmpty(email)) {
    throw Error('Your e-mail should not be empty.');
  }

  // Existing email
  const user = await User.findOne({ email });
  if (user) {
    throw Error('A user has been already registred with this e-mail, Please choose another e-mail.');
  }

  const userObject = {
    firstName,
    lastName,
    email,
    password: await bcrypt.hash(password, saltRounds),
  };

  // TODO: Send transactional email
  return User.create(userObject);
}

async function verifyCredentials(email, password) {
  const user = await User.findOne({ email });
  if (user) {
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (isPasswordCorrect) {
      return user;
    }
  }
  throw Error('User not found with this email/password. Please try again.');
}

async function getUserById(id) {
  if (_.isEmpty(id)) {
    throw Error('You must specify an Id.');
  }
  const user = await User.findById(id);
  if (user) {
    return user;
  }
  throw Error('User not found.');
}

module.exports = {
  createUser,
  verifyCredentials,
  getUserById,
};
