import { redisConnection } from "../config/redis";

export const setCache = async (key: string, value: unknown, ttl = 30) => {
  await redisConnection.set(key, JSON.stringify(value), "EX", ttl);
};

export const getCache = async <T>(key: string): Promise<T | null> => {
  const data = await redisConnection.get(key);

  if (!data) return null;

  return JSON.parse(data);
};
