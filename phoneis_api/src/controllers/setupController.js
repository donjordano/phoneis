module.exports = (server, plugins, restifyValidator) => {
  server.use(plugins.acceptParser(server.acceptable));
  server.use(plugins.queryParser());
  server.use(plugins.bodyParser());
  server.use(restifyValidator);

  // Basic auth implementation
  server.use(plugins.authorizationParser());
  server.use((req, res, next) => {
    const apiKeys = {
      apiUser: 'xxx-XXX-xxx-XXX-xxx',
    };

    if (typeof (req.authorization.basic) === 'undefined'
      || !apiKeys[req.authorization.basic.username]
      || apiKeys[req.authorization.basic.username] !== req.authorization.basic.password) {
      const response = {
        status: 'failure',
        data: 'Please specify a valid API key',
      };
      res.setHeader('content-type', 'application/json');
      res.writeHead(403);
      res.end(JSON.stringify(response));
      return next();
    }

    return next();
  });
};
