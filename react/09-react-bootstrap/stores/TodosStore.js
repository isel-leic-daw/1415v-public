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

    getList(listName) {
        return todoLists[listName];
    },

    addTodoItem(listName, todoText) {
        var list = todoLists[listName];
        list.todos.push({id: list.todos.length, text: todoText});
        this.fireListUpdated(listName);
    },

    markCompleted(listName, todoId) {
        var list = todoLists[listName];
        list.todos.filter(todo => todo.id == todoId).forEach(todo => todo.done = !todo.done);
        this.fireListUpdated(listName);
    },

    updateText(listName, todoId, newText) {
        var list = todoLists[listName];
        list.todos.filter(todo => todo.id == todoId).forEach(todo => todo.text = newText);
        this.fireListUpdated(listName);
    },

    register(listener) {
        listeners.push(listener);
    },
    unregister(listener) {
        var idx = listeners.indexOf(listener);
        listeners.splice(idx, 1);
    },

    fireListUpdated(listName) {
        saveToLocalStorage();
        listeners.forEach(listener => listener(listName));
    }

};

export default TodosStore;