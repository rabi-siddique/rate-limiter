const express = require('express');
const app = express();
const redis = require('redis');

const client = redis.createClient({
  port: process.env.REDIS_PORT || 6379,
  host: process.env.REDIS_HOST || 'localhost',
});

client.connect();

client.on('error', (err) => console.log('Redis Client Error', err));

client.on('connect', function () {
  console.log('Connected to Redis');
});

async function rateLimit(ip) {
  let res;
  try {
    res = await client.incr(ip);
  } catch (err) {
    console.error(err);
    throw err;
  }

  console.log(`Requests Made from ${ip}: ${res}`);
  if (res > 10) {
    return true;
  }

  client.expire(ip, 10);
}

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
