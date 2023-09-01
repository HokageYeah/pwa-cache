const db = {
  _instance: null,
  _getDB() {
    debugger;
    if (db._instance == null) {
      db._instance = new Promise((resolve, reject) => {
        const request = indexedDB.open("TodoBackgroundSync", 1);
        request.onerror = function (event) {
          reject(event.target.error);
        };
        request.onsuccess = function (event) {
          resolve(event.target.result);
        };
        request.onupgradeneeded = function (event) {
          event.target.result.createObjectStore("todos", {
            autoIncrement: true,
          });
        };
      });
    }
    return db._instance;
  },

  _transaction(mode, callBack) {
    debugger;
    return db._getDB().then((db) => {
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(["todos"], mode);
        transaction.oncomplete = function () {
          resolve();
        };
        transaction.onerror = function (event) {
          reject(event.target.error);
        };
        callBack(transaction.objectStore("todos"));
      });
    });
  },

  getTodos() {
    const todos = [];
    return db
      ._transaction("readonly", (store) => {
        const result = store.openCursor();
        result.onsuccess = function (event) {
          const cursor = event.target.result;
          if (cursor) {
            todos.push(cursor.value);
            cursor.continue();
          }
        };
      })
      .then(function () {
        return todos;
      });
  },

  addTodo(name) {
    return db._transaction("readwrite", function (store) {
      store.add({ name: name });
    });
  },

  clearTodos() {
    return db._transaction("readwrite", function (store) {
      store.clear();
    });
  },
};
