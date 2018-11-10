// Libraries requires
const restify = require('restify');
const plugins = require('restify-plugins');
const restifyValidator = require('restify-validator');
const mongoose = require('mongoose');

// Create Restify Server
const server = restify.createServer();

//  DB conenction
const dbConnection = require('./src/config/dbConnection');

// Connect to mongo
mongoose.connect(dbConnection.getMongoConnection(), { useNewUrlParser: true });

// Controllers
const setupController = require('./src/controllers/setupController');
const userController = require('./src/controllers/userController');
const phoneController = require('./src/controllers/phoneController');
// Setup controllers
setupController(server, plugins, restifyValidator);
userController(server);
phoneController(server);

// Start server listener
server.listen(1337, () => {
  console.log(`${server.name} listening at ${server.url}`);
});
