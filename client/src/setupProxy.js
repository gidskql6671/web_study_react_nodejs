/* eslint-disable */

const createProxyMiddleware = require('http-proxy-middleware');

// src/setupProxy.js
module.exports = function(app) {
    app.use(
		'/post', 
		createProxyMiddleware({
            target: 'https://web-study.run.goorm.io/', // 비즈니스 서버 URL 설정
            changeOrigin: true
		})
	);
};