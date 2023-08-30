const CACHE_NAME = "cache-storage";

self.addEventListener("install", function (event) {
  console.log("service worker install watch目录");
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      debugger;
      console.log("cache目录---", cache);
      return cache.addAll(["./", "./index.html", "./style.css", "./cat.png"]);
    })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      debugger;
      console.log("cacheNames---", cacheNames);
      console.log("cacheNameskeys---", caches.keys());
      return Promise.all(
        cacheNames
          .filter(function (cacheName) {
            debugger;
            return cacheName != CACHE_NAME;
          })
          .map(function (cacheName) {
            debugger;
            return caches.delete(cacheName);
          })
      );
    })
  );
});

// self.addEventListener("fetch", function (event) {
//   event.respondWith(
//     caches.match(event.request).then(function (response) {
//       console.log("fetch-caches-----", caches);
//       console.log("fetch-response-----", response);
//       debugger;
//       if (response) {
//         return response;
//       }
//       //   const fetchRequest = event.request.clone();
//       const fetchRequest = event.request;
//       return fetch(fetchRequest).then(function (response) {
//         const responseToCache = response.clone();
//         debugger;
//         caches.open(CACHE_NAME).then(function (cache) {
//           cache.put(event.request, responseToCache);
//         });
//         return response;
//       });
//     })
//   );
// });


// 请求的 URL 方案是否为 http: 或 https:，如果是，则将请求放入缓存。如果不是这两种方案，它将使用 fetch 函数来处理请求。
// 能够避免将 chrome-extension 方案的请求放入缓存
self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) {
        return response;
      }
      const requestUrl = new URL(event.request.url);
      if (requestUrl.protocol === "http:" || requestUrl.protocol === "https:") {
        const fetchRequest = event.request.clone();
        return fetch(fetchRequest).then(function (response) {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then(function (cache) {
            cache.put(event.request, responseToCache);
          });
          return response;
        });
      } else {
        // 处理非 HTTP 或 HTTPS 方案的请求
        return fetch(event.request);
      }
    })
  );
});
