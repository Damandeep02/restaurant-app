const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/restaurants',
    createProxyMiddleware({
      target: 'http://localhost:3001', // Change this if your backend runs on a different port
      changeOrigin: true,
    })
  );
};
