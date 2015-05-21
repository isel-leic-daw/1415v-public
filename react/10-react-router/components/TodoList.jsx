 import React from "react";
import Styles from "./TodoList.css";
import { Glyphicon, ButtonInput, Input, Row, Col } from "react-bootstrap";

import TodosStore from "./../stores/TodosStore";

import Display from "./Display";

// TodoList
export default React.createClass(
{
    // TO use this.context.router you need to use set contextType
    // contextTypes: { router: React.PropTypes.func },
    // ...
    // listId = this.context.router.getCurrentParams().id;
    // ....

    loadStateFromStore(listId)
    {
        return { list: TodosStore.getList(listId) };
    },

    getInitialState()
    {
        return this.loadStateFromStore(this.props.params.id);
    },

    // This lifecycle event is overrided because this
    // component is used in a react-router dynamic segment:
    // https://github.com/rackt/react-router/blob/master/docs/guides/overview.md#important-note-about-dynamic-segments
    componentWillReceiveProps(nextProps)
    {
        this.setState(this.loadStateFromStore(nextProps.params.id));
    },

    render()
    {
        const totalCount = this.state.list.todos.length;
        const doneCount = this.state.list.todos.filter(t => t.done).length;
        return (
            <div className="todos">
                <h2>{this.state.list.name}
                    <small className="pull-right"><code>({doneCount}/{totalCount})</code></small>
                </h2>
                <TodoList todos={this.state.list.todos} onCompleted={this.handleCompleted} onUpdatedText={this.handleUpdatedText} />
                <TodoForm onNewTodo={this.handleNewTodo} />
            </div>
        );
    },

    handleNewTodo(text)             { TodosStore.addTodoItem(this.props.params.id, text); },
    handleCompleted(todoId)         { TodosStore.markCompleted(this.props.params.id, todoId); },
    handleUpdatedText(todoId, text) { TodosStore.updateText(this.props.params.id, todoId, text); },

    componentDidMount()     { TodosStore.addChangeListener(this._updateStateFromStore); },
    componentWillUnmount()  { TodosStore.removeChangeListener(this._updateStateFromStore); },
    _updateStateFromStore(updatedList)
    {
        if(updatedList == this.state.list.id)
            this.setState({ list: TodosStore.getList(this.props.params.id) });
    },
});

var TodoList = React.createClass(
{
    propTypes: {
        onCompleted: React.PropTypes.func.isRequired,
        onUpdatedText: React.PropTypes.func.isRequired
    },

    render()
    {
        return (
            <ul>
                {this.props.todos.map(todo =>
                <TodoItem key={todo.id} todo={todo}
                          onCompleted={this.handleCompleted}
                          onUpdatedText={this.handleUpdatedText}
                />
                )}
            </ul>
        );
    },

    handleCompleted(todoId)         { this.props.onCompleted(todoId) },
    handleUpdatedText(todoId, text) { this.props.onUpdatedText(todoId, text) }
});


var TodoItem = React.createClass(
{
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
        return (
            <li key={this.props.todo.id} className={this.props.todo.done?"done":""}>
            <Display when={this.state.isEditing}>
                <div>
                    <input type="text" value={this.state.text} onChange={this.handleEditUpdateText} />&nbsp;
                    <a href="#" onClick={this.handleEditSave}>save</a>
                    &nbsp;|&nbsp;
                    <a href="#" onClick={this.handleEditCancel}>cancel</a>
                </div>
                <div>
                    <input type="checkbox" checked={this.props.todo.done} onChange={this.handleCompleted} />
                    &nbsp;
                    <span onClick={this.handleCompleted}>{this.props.todo.text}</span>
                    <Display when={!this.props.todo.done} strict={false} >
                        <div className="pull-right actions">
                            <span onClick={this.handleEdit}><Glyphicon glyph='edit' /></span>&nbsp;
                        </div>
                    </Display>
                </div>
            </Display>
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
                <Input type="text" ref="text" buttonAfter={<ButtonInput type="submit" value='Add' />} />
            </form>
        );
    }
});


