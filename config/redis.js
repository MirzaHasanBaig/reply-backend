const Redis = require('ioredis');

// Use environment variable for the Redis URL, or default to '127.0.0.1'
const REDIS_URL = process.env.REDIS_URL || "127.0.0.1";

// Create a new Redis client
const redisClient = new Redis({
  host: REDIS_URL,
  port: 6379,
  retryStrategy: (times) => {
    // Retry strategy, backoff after 1 second, and then exponential backoff
    return Math.min(times * 50, 2000);
  }
});

// Listen for Redis connection events
redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

redisClient.on('error', (err) => {
  console.error('Redis connection error:', err);
});

// Optional: Test Redis connection by pinging the server
redisClient.ping().then((response) => {
  console.log('Redis PONG response:', response); // Should log "PONG" if connection is successful
}).catch((err) => {
  console.error('Redis ping error:', err);
});

module.exports = { redisClient };
