async function rateLimit(ip, client) {
  let requests;
  try {
    requests = await client.incr(ip);
    console.log(`Requests Made from ${ip}: ${requests}`);

    let ttl;
    if (requests == 1) {
      client.expire(ip, 60);
    } else {
      ttl = await client.ttl(ip);
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
