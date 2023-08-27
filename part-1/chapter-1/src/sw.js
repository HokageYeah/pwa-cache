
// serviceWorker 监听 install事件，回调中缓存所需文件
self.addEventListener('install', function(event) {
    console.log('service worker install watch监听');
    // event.waitUntil(
    //     caches.open('v1').then(function(cache) {
    //         return cache.addAll([
    //             './',
    //             './index.html',
    //             './index.js',
    //             './index.css',
    //             './assets/images/logo.png'
    //         ])
    //     })
    // )
})

// 拦截所有请求事件
// 如果缓存中已经有请求的数据就直接用缓存，否则去请求数据
self.addEventListener('fetch', function(event) {
    console.log('service worker fetch watch监听');
    // event.respondWith(
    //     caches.match(event.request).then(function(response) {
    //         if (response) {
    //             return response
    //         }
    //         return fetch(event.request)
    //     })
    // )
})
