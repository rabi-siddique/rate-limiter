const express = require('express');
const app = express();
const redisClient = require('./redis-client');
const rateLimit = require('./rate-limit');

app.get('/rate-limit', async (req, res) => {
  let status = await rateLimit(req.ip);
  if (status) {
    res.status(429).send('Too many requests - try again later');
    return;
  }
  // Allow access to resources
  res.send('Access Provided.');
});

app.listen(process.env.PORT || 3000, () => console.log('App Running'));
