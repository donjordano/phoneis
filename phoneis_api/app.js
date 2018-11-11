// Libraries requires
const restify = require('restify');
const plugins = require('restify-plugins');
const restifyValidator = require('restify-validator');
const mongoose = require('mongoose');
const setupController = require('./src/controllers/setupController');
const userRoutes = require('./src/routes/userRoutes');
const phoneRoutes = require('./src/routes/phoneRoutes');

// Create Restify Server
const server = restify.createServer();

//  DB conenction
const dbConnection = require('./src/config/dbConnection');

// Connect to mongo
mongoose.connect(dbConnection.getMongoConnection(), { useNewUrlParser: true });

// Setup controllers
// TODO: To check the validator later, I had to disable it to work quickly on the rest
setupController(server, plugins, restifyValidator);

// Applay routes
userRoutes.applyRoutes(server, '/user');
phoneRoutes.applyRoutes(server, '/phone');

// Start server listener
server.listen(1337, () => {
  console.log(`${server.name} listening at ${server.url}`);
});
