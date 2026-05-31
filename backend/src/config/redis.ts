import IORedis from "ioredis";
export const redisConfig = {
  host: "localhost",
  port: 6379,
};
export const redisConnection = new IORedis(redisConfig);
