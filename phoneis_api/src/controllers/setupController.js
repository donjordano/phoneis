module.exports = (server, plugins, restifyValidator) => {
  server.use(plugins.acceptParser(server.acceptable));
  server.use(plugins.queryParser());
  server.use(plugins.bodyParser());
  server.use(restifyValidator);
};
