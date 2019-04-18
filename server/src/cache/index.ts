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

  async get(key: string, storeFunction: Promise<any>): Promise<any> {
    const value = this.cache.get(key);
    if (value) {
      return value;
    }

    const result = await storeFunction;
    this.cache.set(key, JSON.parse(result.body));
    return this.cache.get(key);
  }

  del(keys: Array<string> | string) {
    this.cache.del(keys);
  }

  flush() {
    this.cache.flushAll();
  }
}
