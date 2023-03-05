const express = require('express');
const app = express();
const redisClient = require('./redis-client');
const rateLimit = require('./rate-limit');

app.get(
  '/rate-limit',
  rateLimit({ windowSize: 60, numberOfRequests: 10 }),
  (req, res) => {
    return res.send('Access Provided.');
  }
);

app.listen(process.env.PORT || 3000, () => console.log('App Running'));
