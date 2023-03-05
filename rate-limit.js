const redisClient = require('./redis-client');

async function rateLimit(ip) {
  let requests;
  try {
    requests = await redisClient.incr(ip);
    console.log(`Requests Made from ${ip}: ${requests}`);

    let ttl;
    if (requests == 1) {
      redisClient.expire(ip, 60);
    } else {
      ttl = await redisClient.ttl(ip);
      console.log('TTL is', ttl);
    }

    if (requests > 10) {
      return true;
    }
  } catch (err) {
    console.error(err);
    throw err;
  }

  return false;
}

module.exports = rateLimit;
