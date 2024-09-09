import NodeCache from "node-cache";

export default class CacheUtil {
  private static instance: CacheUtil;
  private cache: NodeCache;

  private constructor() {
    this.cache = new NodeCache();
  }

  public static getInstance(): CacheUtil {
    if (!this.instance) {
      this.instance = new CacheUtil();
    }

    return this.instance;
  }

  public setCache<T>(key: string, value: T, duration: number | string): void {
    this.cache.set(key, value, duration);
  }

  public getCache<T>(key: string): T | undefined {
    return this.cache.get(key);
  }

  public delCache(key: string): void {
    this.cache.del(key);
  }
}
