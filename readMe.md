## Rate Limiter

This middleware allows rate limiting of incoming requests to an NodeJS/Express application by tracking the number of requests made by an IP address within a specified time window. Redis is used as a data store to track the number of requests and expiration of the rate limiting key.

## Installation

To install the package, run the following command:

```bash
npm install --save express redis
```

## Usage

To use the rate limiter, simply require the rateLimit function and pass it an options object with the desired rate limit configuration. Then, add the middleware to your Express app using the `app.use` method.

```javascript
const express = require('express');
const rateLimit = require('./rate-limit');

const app = express();

app.use(
  rateLimit({
    windowSize: 60, // 60 seconds window
    numberOfRequests: 10, // limit each IP to 10 requests per window
  })
);

// Your routes and other middleware here
```

The `rateLimit` middleware will limit the number of requests per IP address within the specified time window. If a client exceeds the rate limit, they will receive a 429 response with a message indicating that they have exceeded the limit and should try again later.

## Redis Configuration

The rate limiter relies on Redis for storage and rate limiting. `redis-client.js` file contains the configuration for redis with the following content:

```javascript
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
```

Make sure to set the appropriate values for REDIS_PORT and REDIS_HOST in your environment.
