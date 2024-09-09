import { Request, Response, NextFunction } from "express";
import CacheUtil from "../utils/cacheUtil";

const cache = CacheUtil.getInstance();
const cachePrefix = "lily_users_";

// Armazenar cache
export const storeCache = <T>() => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const cacheKey = cachePrefix + (req.params.id || "all");

    if (req.method !== "GET") {
      console.log("Cache não foi salvo: Método não é GET");
      return next();
    }

    const cachedResponse = cache.getCache<T>(cacheKey);

    if (cachedResponse) {
      return res.status(200).json(cachedResponse);
    }

    const originalJson = res.json.bind(res);

    res.json = (body: T) => {
      cache.setCache<T>(cacheKey, body, 600);
      return originalJson(body);
    };

    console.log("Cache salvo:", cacheKey);
    next();
  };
};

// Invalidar cache (caches desatualizados)
export const invalidateCache = <T>() => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const defaultKey = cachePrefix + "all";

    if (!cache.getCache<T>(defaultKey) || req.method == "GET") {
      console.log("Cache não existente: não há necessidade de invalidar");
      return next();
    }

    if (["PATCH", "DELETE", "PUT"].includes(req.method) || req.params.id) {
      const cacheKey = cachePrefix + req.params.id;

      if (cache.getCache<T>(cacheKey)) {
        cache.delCache(cacheKey);
      }
    }

    cache.delCache(defaultKey);

    console.log("Caches invalidados");
    next();
  };
};