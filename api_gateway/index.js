const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { createProxyMiddleware } = require("http-proxy-middleware");
require('dotenv').config();

const app = express();
app.use(cors());
app.use(helmet()); //add security headers
app.use(morgan("combined")); //log HTTP requests
app.disable("x-powered-by"); //Hide express server information

const services = [
  {
    route: "/api/posts",
    target: process.env.PORT || `http://localhost:3001`,
  },
];
console.log('port process:', process.env.ENDPOINTURL)
const rateLimit = 20;
const interval = 60 * 1000;

const reqCounts = {};

setInterval(() => {
  Object.keys(reqCounts).forEach((ip) => {
    reqCounts[ip] = 0;
  });
}, interval);

const rateLimitAndTimeout = (req, res, next) => {
  const ip = req.ip;
  reqCounts[ip] = (reqCounts[ip] || 0) + 1;

  if (reqCounts[ip] > rateLimit) {
    return res.status(429).json({
      code: 429,
      status: "Error",
      message: "Rate limit exceeded.",
      data: null,
    });
  }

  req.setTimeout(15000, () => {
    res.status(504).json({
      code: 504,
      status: "Error",
      message: "Gateway timeout",
      data: null,
    });
    req.abort();
  });
  next();
};

app.use(rateLimitAndTimeout);

services.forEach(({ route, target }) => {
  const proxyOptions = {
    target,
    changeOrigin: true,
  };
  app.use(route, rateLimitAndTimeout, createProxyMiddleware(proxyOptions));
});

// Handler for route-not-found
app.use((_req, res) => {
  res.status(404).json({
    code: 404,
    status: "Error",
    message: "Route not found.",
    data: null,
  });
});

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`API Gateway is running on port ${PORT}`);
});