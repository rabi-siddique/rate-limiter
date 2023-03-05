/**
 * A function that implements a simple rate-limiting mechanism using Redis.
 *
 * @param {string} ip - The IP address of the client that is making the request.
 * @returns {Promise<boolean>} - A promise that resolves to true if the client has exceeded the rate limit, or false otherwise.
 */

async function rateLimit(ip, client) {
  let res;
  try {
    // Increment the value stored in Redis for the given ip key.
    res = await client.incr(ip);
  } catch (err) {
    console.error(err);
    throw err;
  }

  // Log the number of requests made from the given ip.
  console.log(`Requests Made from ${ip}: ${res}`);

  // Check if the value stored in Redis for the ip key is greater than 10.
  if (res > 10) {
    // If the value is greater than 10, return true to indicate that the client has exceeded the rate limit.
    return true;
  }

  // If the value is not greater than 10, set an expiration time of 10 seconds for the ip key.
  client.expire(ip, 10);

  // Return false to indicate that the client has not exceeded the rate limit.
  return false;
}

module.exports = rateLimit;
