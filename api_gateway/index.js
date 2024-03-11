const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();



const services = [
    {
        route: '/api/posts',
        target: 'http://localhost:3001',
    },
];

services.forEach(({ route, target }) => {
    app.use(route, createProxyMiddleware({ target, changeOrigin: true }));
});

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
    console.log(`API Gateway is running on port ${PORT}`);
});