const redisClient = require('./redis-client');

function rateLimit({ windowSize, numberOfRequests }) {
  return async function (req, res, next) {
    let requests, ttl;
    try {
      requests = await redisClient.incr(req.ip);

      if (requests == 1) {
        redisClient.expire(req.ip, windowSize);
      } else {
        ttl = await redisClient.ttl(req.ip);
      }

      if (requests > numberOfRequests) {
        return res
          .status(429)
          .send({ message: 'Too many requests - Try again later.', ttl });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).send('Something went wrong. Try again later.');
    }

    return next();
  };
}

module.exports = rateLimit;
