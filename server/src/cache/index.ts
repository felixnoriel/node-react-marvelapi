import * as NodeCache from "node-cache";

export default class Cache {
  protected cache: NodeCache;

  constructor(ttlSeconds: number) {
    this.cache = new NodeCache({
      stdTTL: ttlSeconds,
      checkperiod: ttlSeconds * 0.2,
      useClones: false
    });
  }

  /**
   * This function will get the data by key in memory cache using NodeCache
   * If key doesn't exist, it will access the storeFunction cb, set the data using the key and return it
   * @param key
   * @param storeFunction
   * @returns the data from the cache if exists otherwise from the callback
   */
  async get(key: string, storeFunction: Promise<any>): Promise<any> {
    const value = this.cache.get(key);
    if (value) {
      return value;
    }

    const result = await storeFunction;
    this.cache.set(key, JSON.parse(result.body));
    return this.cache.get(key);
  }

  /**
   * Function will delete the cache by its key
   * @param keys
   */
  del(keys: Array<string> | string) {
    this.cache.del(keys);
  }

  /**
   * Function will empty the cache
   */
  flush() {
    this.cache.flushAll();
  }
}
