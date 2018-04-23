export default class Cache {
  store = {};
  has(name) {
    return this.store.hasOwnProperty(name)
  }
  remember(name, getter) {
    if (!this.has(name)) {
      this.store[name] = {
        value: getter()
      }
    }
    return this.store[name].value
  }
  forget(name) {
    if (name) {
      if (this.has(name)) {
        delete this.store[name]
      }
    } else {
      this.store = {}
    }
  }
}
export function attachCache(obj, cache, toCache) {
  for (const key in toCache) {
    Object.defineProperty(obj, key, {
      get() {
        return cache.remember(key, () => toCache[key].call(this))
      },
    })
  }
}
