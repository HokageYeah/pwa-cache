const precacheList = <%- precacheList %>;

self.addEventListener('install', event => {
    event.waitUntil((async () => {
      const cache = await caches.open(precacheName);
      await cache.addAll(precacheList);
    })());
  });