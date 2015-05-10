

var DEFAULT_TODO_LISTS = {
    "shopping": {
        id: "shopping",
        name: "Lista de Compras",
        todos: [
            { id: 0, text: "Alface" },
            { id: 1, text: "Maçãs"  },
            { id: 2, text: "Peras", done: true },
            { id: 3, text: "Meloa"  }
        ]
    },
    "books": {
        id: "books",
        name: "Lista de Livros",
        todos: [
            { id: 0, text: "You Don't Know JS: ES6 & Beyond" }
        ]
    },
    "travel": {
        id: "travel",
        name: "Lista de Viagem",
        todos: [
            { id: 0, text: "Mapa" },
            { id: 1, text: "GPS" },
        ]
    },
};

function getFromLocalStorage() {
    var lists = localStorage["TODO_LISTS"];
    if(lists) return JSON.parse(lists);
}
function saveToLocalStorage() {
    localStorage["TODO_LISTS"] = JSON.stringify(todoLists);
}
console.log("INFO: To reset cached list of TODOs use: localStorage.removeItem('TODO_LISTS')")

var todoLists = getFromLocalStorage() || DEFAULT_TODO_LISTS;

var listeners = [];

var TodosStore = {

    getList: function(listName) {
        return todoLists[listName];
    },

    addTodoItem: function(listName, todoText) {
        var list = todoLists[listName];
        list.todos.push({id: list.todos.length, text: todoText});
        this.fireListUpdated(listName);
    },

    markCompleted: function(listName, todoId) {
        var list = todoLists[listName];
        list.todos.forEach(function(todo) { if(todo.id == todoId) todo.done = true; });
        this.fireListUpdated(listName);
    },

    updateText: function(listName, todoId, newText) {
        var list = todoLists[listName];
        list.todos.forEach(function(todo) { if(todo.id == todoId) todo.text = newText; });
        this.fireListUpdated(listName);
    },

    register: function(listener) {
        listeners.push(listener);
    },
    unregister: function(listener) {
        var idx = listeners.indexOf(listener);
        listeners.splice(idx, 1);
    },

    fireListUpdated: function(listName) {
        saveToLocalStorage();
        listeners.forEach(function(listener) { listener(listName) });
    }




};

module.exports = TodosStore;