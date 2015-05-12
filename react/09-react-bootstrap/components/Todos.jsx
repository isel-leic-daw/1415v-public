import React from "react";
import Styles from "./Todos.css";

import { Glyphicon, Input, Row, Col } from "react-bootstrap";
import TodosStore from "./../stores/TodosStore";

export default React.createClass(
{
    getInitialState()
    {
        var list = TodosStore.getList(this.props.listName);
        return {list: list};
    },

    handleNewTodo(text)
    {
        TodosStore.addTodoItem(this.props.listName, text);
    },

    handleCompleted(todoId)
    {
        TodosStore.markCompleted(this.props.listName, todoId);
    },

    handleUpdatedText(todoId, text)
    {
        TodosStore.updateText(this.props.listName, todoId, text);
    },

    render()
    {
        return (
            <div className="todos">
                <h2>{this.state.list.name}
                    <small className="pull-right"><code>(
                    {this.state.list.todos.filter(t => t.done).length}/{this.state.list.todos.length}
                    )</code></small>
                </h2>
                <TodoList todos={this.state.list.todos} onCompleted={this.handleCompleted} onUpdatedText={this.handleUpdatedText} />
                <TodoForm onNewTodo={this.handleNewTodo} />
            </div>
        );
    },

    componentDidMount()
    {
        TodosStore.register(this._updateStateFromStore);
    },

    componentWillUnmount()
    {
        TodosStore.unregister(this._updateStateFromStore);
    },

    _updateStateFromStore(updatedList)
    {
        if(updatedList == this.state.list.id)
            this.setState({list: TodosStore.getList(this.props.listName) });
    }

});

var TodoList = React.createClass({

    propTypes: {
        onCompleted: React.PropTypes.func.isRequired,
        onUpdatedText: React.PropTypes.func.isRequired
    },

    render()
    {
        return (
            <ul>
                {this.props.todos.map(todo => <TodoItem key={todo.id} todo={todo}
                    onCompleted={this.handleCompleted}
                    onUpdatedText={this.handleUpdatedText}
                /> )}
            </ul>
        );
    },

    handleCompleted(todoId) { this.props.onCompleted(todoId) },
    handleUpdatedText(todoId, text) { this.props.onUpdatedText(todoId, text) }

});


var TodoItem = React.createClass({

    propTypes: {
        onCompleted: React.PropTypes.func.isRequired,
        onUpdatedText: React.PropTypes.func.isRequired
    },

    getInitialState()
    {
        return {
            isEditing: false,
            text: this.props.todo.text
        };
    },

    render()
    {
        var actions = <div className="pull-right actions">
            <span onClick={this.handleEdit}><Glyphicon glyph='edit' /></span>&nbsp;
            <span onClick={this.handleCompleted}><Glyphicon glyph='trash' /></span>
        </div>;

        var textOrEditingUI = <span>{this.props.todo.text}</span>;
        if(this.state.isEditing) {
            textOrEditingUI = <span>
                <input type="text" value={this.state.text} onChange={this.handleEditUpdateText} />&nbsp;
                <a href="#" onClick={this.handleEditSave}>save</a>
                &nbsp;|&nbsp;
                <a href="#" onClick={this.handleEditCancel}>cancel</a>
            </span>
        }

        return (
            <li key={this.props.todo.id} className={this.props.todo.done?"done":""}>
                {textOrEditingUI}
                {this.state.isEditing ? <span></span> : actions}
            </li>
        );
    },

    handleEdit(evt) {           evt.preventDefault(); this.setState({ isEditing: true }); },
    handleEditUpdateText(evt) { evt.preventDefault(); this.setState({ text: evt.target.value }); },
    handleEditCancel(evt) {     evt.preventDefault(); this.setState({ isEditing: false }); },

    handleEditSave(evt) {
        evt.preventDefault();
        this.setState({ isEditing: false });
        this.props.onUpdatedText(this.props.todo.id, this.state.text);
    },


    handleCompleted() { this.props.onCompleted(this.props.todo.id) }

});

var TodoForm = React.createClass({

    propTypes: {
        onNewTodo: React.PropTypes.func.isRequired
    },

    handleFormSubmit(evt) {
        evt.preventDefault();
        var text = this.refs.text.getValue();
        this.props.onNewTodo(text);
    },

    render() {
        return (
            <form onSubmit={this.handleFormSubmit}>
                <Input type="text" ref="text" buttonAfter={<Input type='submit' value='Add' />} />
            </form>
        );
    }

});
