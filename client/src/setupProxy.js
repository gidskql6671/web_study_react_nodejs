const createProxyMiddleware = require('http-proxy-middleware');

// src/setupProxy.js
module.exports = function(app) {
    app.use(
		'/api', 
		createProxyMiddleware({
            target: 'https://web-study.run.goorm.io/',
            changeOrigin: true
		})
	);
};