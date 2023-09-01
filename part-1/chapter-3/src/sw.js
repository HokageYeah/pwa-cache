importScripts("./db.js");
importScripts("./network.js");

// serviceWorker 监听 install事件，回调中缓存所需文件
self.addEventListener("install", function (event) {
  console.log("service worker install watch监听");
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

// 拦截所有请求事件
// 如果缓存中已经有请求的数据就直接用缓存，否则去请求数据
self.addEventListener("fetch", function (event) {
  console.log("service worker fetch watch监听");
  // event.respondWith(
  //     caches.match(event.request).then(function(response) {
  //         if (response) {
  //             return response
  //         }
  //         return fetch(event.request)
  //     })
  // )
});

function notification(todos) {
  self.clients.matchAll().then(function (clients) {
    if (clients && clients.length > 0)
      clients.forEach(function (client) {
        client.postMessage(todos);
      });
  });
}

let retryTimes = 1;
self.addEventListener("sync", function (event) {
    console.log("sync--------", event);
  if (event.tag === "add-todo") {
    const date = new Date();
    console.log(`开始进行后台同步：${event.tag}`);
    console.log(
      `第 ${retryTimes++} 次同步：${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    );
    if (event.lastChance) {
      console.log("这是最后一次尝试哦^ _ ^");
    }
    event.waitUntil(
      db.getTodos().then(function (todos) {
        return network.addTodos(todos).then(function (todos) {
          console.log("来自服务器的响应：", todos);
          notification(todos);
          return db.clearTodos();
        });
      })
    );
  }
});
