var React = require('react');

var Todos = React.createClass({

    getInitialState() {
        return {
            todos: [
                { id: 1, text: "Parte 1" },
                { id: 2, text: "Parte 2" },
                { id: 3, text: "Parte 3" }
            ]
        }
    },

    componentDidMount: function() {
        var self = this;
        $.getJSON("https://api.github.com/users/octocat/repos", function(data) {
            var currTodos = self.state.todos;
            data.forEach(repo => currTodos.push({id: repo.id, text: repo.name}));
            self.setState({todos: currTodos});
        });
    },

    handleNewTodo(text) {
        var currTodos = this.state.todos;
        currTodos.push({
            id: currTodos.length + 1,
            text: text
        });
        this.setState({
            todos : currTodos
        });
    },

    render() {
        return (
            <TodosWrapper>
                <h2>Todos ({this.state.todos.length})</h2>
                <TodoList todos={this.state.todos} />
                <TodoForm onNewTodo={this.handleNewTodo} />
            </TodosWrapper>
        );
    }

});


var TodosWrapper = React.createClass({

    render()
    {
        return <div>
                    {this.props.children}
                </div>
    }
});

var TodoList = React.createClass({

    render()
    {
        return (
            <ul>
                {
                    this.props.todos
                        .map(todo => <li key={todo.id}>{todo.text}</li>)
                }
            </ul>
        );
    }

});


var TodoForm = React.createClass({

    propTypes: {
        onNewTodo: React.PropTypes.func.isRequired
    },

    handleFormSubmit(evt) {
        evt.preventDefault();
        var text = React.findDOMNode(this.refs.text).value;
        this.props.onNewTodo(text);
    },

    render() {
        return (
            <form onSubmit={this.handleFormSubmit}>
                <input type="text" ref="text" />
                <input type="submit" value="Add" on />
            </form>
        );
    }

});


module.exports = Todos;