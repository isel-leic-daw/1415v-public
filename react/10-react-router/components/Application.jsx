import React from "react";
import { Alert, Navbar, Nav, Badge, Label, NavItem, DropdownButton, MenuItem, Col, Row } from "react-bootstrap"
import { NavItemLink } from "react-router-bootstrap"

import Router, {Route, Link, DefaultRoute, NotFoundRoute, RouteHandler} from "react-router";

import TodoListsContainer from "./TodoListsContainer";
import TodoListCreate     from "./TodoListCreate";
import TodoList           from "./TodoList";
import PageNotFound       from "./PageNotFound";
import Welcome            from "./Welcome";
import WelcomeTodoLists   from "./WelcomeTodoLists";

import TasksSummary   from "./TasksSummary";

var Root = React.createClass(
{
  render: function() {
    return (
      <div>
        <Navbar brand={<Link to="root">ToDoLists</Link>} >
          <Nav>
            <NavItemLink to="todos" >Listas</NavItemLink>
            <NavItemLink to="todos-create" >Nova Lista</NavItemLink>
            <NavItem href="#/foo" >Foo</NavItem>
          </Nav>
          <TasksSummary />
        </Navbar>
        <div className="container">
          <RouteHandler {...this.props} />
        </div>
      </div>
    );
  }
});

var routes = (
  <Route name="root" path="/" handler={Root}>
    <DefaultRoute handler={Welcome}/>
    <Route path="todos/create" name="todos-create"  handler={TodoListCreate} />
    <Route path="todos" name="todos"  handler={TodoListsContainer} >
      <DefaultRoute handler={WelcomeTodoLists}/>
      <Route path=":id" name="todo"  handler={TodoList} />
    </Route>
    <NotFoundRoute handler={PageNotFound} />
  </Route>
);

var app = document.getElementById("app");
Router.run(routes, /*Router.HistoryLocation,*/ (Handler, state) => React.render(<Handler params={state.params}/>, app));

