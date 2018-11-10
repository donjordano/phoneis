const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const { jwtSecret } = require('../config/config');
const userService = require('../service/userService');

module.exports = (server, plugins, restifyValidator) => {
  server.use(plugins.acceptParser(server.acceptable));
  server.use(plugins.queryParser());
  server.use(plugins.bodyParser());
  server.use(passport.initialize());
  server.use(restifyValidator);

  // Passport login initialization (Strategies & Authentication)
  // Localstrategy (to validate the credentials)
  passport.use(new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    (username, password, done) => {
      return userService.verifyCredentials(username, password).then(loggedUser => done(null, loggedUser)).catch((error) => { done(error, false, { message: error.message }); });
    },
  ));
  
  // JWT Strategy (to validate JWT tokens)
  passport.use(new JWTstrategy({
    secretOrKey: jwtSecret,
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  }, (jwtPayload, done) => {
    return userService.getUserById(jwtPayload._id).then((foundUser) => {
      return done(null, foundUser);
    }).catch((error) => {
      return done(error);
    });
  }));

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    return userService.getUserById(user._id).then(DeserializedUser => done(null, DeserializedUser)).catch(error => done(null, false, error));
  });

  // Basic auth implementation
  // TODO: Uncomment
  // server.use(plugins.authorizationParser());
  // server.use((req, res, next) => {
  //   const apiKeys = {
  //     apiUser: 'xxx-XXX-xxx-XXX-xxx',
  //   };

  //   if (typeof (req.authorization.basic) === 'undefined'
  //     || !apiKeys[req.authorization.basic.username]
  //     || apiKeys[req.authorization.basic.username] !== req.authorization.basic.password) {
  //     const response = {
  //       status: 'failure',
  //       data: 'Please specify a valid API key',
  //     };
  //     res.setHeader('content-type', 'application/json');
  //     res.writeHead(403);
  //     res.end(JSON.stringify(response));
  //     return next();
  //   }

  //   return next();
  // });
};
