import assign from "object-assign";
import { EventEmitter } from "events";

const todoLists = getFromLocalStorage();

const TodosStore = assign({}, EventEmitter.prototype, {

    getLists()
    {
        return Object.keys(todoLists).map(listKey => todoLists[listKey]);
    },

    getList(listName)
    {
        return todoLists[listName];
    },

    createList(listName, listDescription)
    {
        todoLists[listName] = {
            id: listName,
            name: listDescription,
            todos: []
        };
        this.emitChange(listName);
    },

    addTodoItem(listName, todoText)
    {
        let list = todoLists[listName];
        list.todos.push({id: list.todos.length, text: todoText});
        this.emitChange(listName);
    },

    markCompleted(listName, todoId)
    {
        let list = todoLists[listName];
        let todo = list.todos.filter(todo => todo.id == todoId)[0];
        todo.done = !todo.done;
        this.emitChange(listName);
    },

    updateText(listName, todoId, newText)
    {
        var list = todoLists[listName];
        list.todos.filter(todo => todo.id == todoId).forEach(todo => todo.text = newText);
        this.emitChange(listName);
    },

    addChangeListener(callback)    { this.on("CHANGE", callback); },
    removeChangeListener(callback) { this.removeListener("CHANGE", callback); },
    emitChange(listName) {
        saveToLocalStorage();
        this.emit("CHANGE", listName);
    }

});

export default TodosStore;

// ----------------------------------------------------------------------------------------------------
// STORAGE
// ----------------------------------------------------------------------------------------------------
console.log("INFO: To reset cached list of TODOs use: localStorage.removeItem('TODO_LISTS')");

function getFromLocalStorage() {
    var data = localStorage["TODO_LISTS"];
    return data ? JSON.parse(data) : getDefaultTodoLists();
}

function saveToLocalStorage() {
    localStorage["TODO_LISTS"] = JSON.stringify(todoLists);
}

function getDefaultTodoLists() {
    return {
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
        }
    }
};
