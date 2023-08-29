
self.addEventListener('install', function(event) {
    console.log('service worker install watch目录');
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
});