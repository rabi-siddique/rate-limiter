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

module.exports = client;
