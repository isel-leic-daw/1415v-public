import React    from "react";
import { Alert, Navbar, Nav, Badge, Label, NavItem, DropdownButton, MenuItem, Col, Row } from "react-bootstrap"
import Router, {RouteHandler} from "react-router";

import TodosStore from "./../stores/TodosStore";

// TasksSummary
export default React.createClass(
{
    loadCountersFromStore() {
        const count = {
            doneCount: TodosStore.getLists().reduce((acc, list) => acc + list.todos.reduce((c, t) => c + (t.done ? 1:0), 0), 0),
            totalCount: TodosStore.getLists().reduce((acc, list) => acc + list.todos.length, 0)
        }
        return count;
    },

    getInitialState() {
        return this.loadCountersFromStore();
    },

    render() {
        return (
          <Nav navbar right>
          <NavItem>Tarefas concluidas: <Label bsStyle="warning">{this.state.doneCount}</Label> /&nbsp;
                                         <Label bsStyle="info">{this.state.totalCount}</Label></NavItem>
          </Nav>
          );
    },

    componentDidMount()     { TodosStore.addChangeListener(this._updateStateFromStore); },
    componentWillUnmount()  { TodosStore.removeChangeListener(this._updateStateFromStore); },
    _updateStateFromStore(updatedList)
    {
        console.log("_updateStateFromStore", updatedList);
        this.setState(this.loadCountersFromStore());
    },

});
