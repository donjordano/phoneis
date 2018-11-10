const passport = require('passport');

function ensureAuthenticated(req, res, next) {
  passport.authenticate('jwt', { session: false })(req, res, next);
}

module.exports = {
  ensureAuthenticated,
};
