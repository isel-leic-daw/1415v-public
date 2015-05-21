import React    from "react";
import { ListGroupItemLink } from "react-router-bootstrap";
import { Alert, Navbar, Nav, ListGroup, Badge, Label, NavItem, DropdownButton, MenuItem, Col, Row } from "react-bootstrap";
import Router, { RouteHandler } from "react-router";

import TodosStore from "./../stores/TodosStore";

export default React.createClass(
{
  getInitialState: function() {
    return {
      lists: TodosStore.getLists()
    };
  },

  render: function() {
    return (
      <div>
        <Row>
          <Col md={3}>
            <ListGroup>
            {this.state.lists.map(list => (
              <ListGroupItemLink key={list.id} to="todo" params={{id: list.id}}>{list.name}</ListGroupItemLink>
              )
            )}
            </ListGroup>
          </Col>
          <Col md={9}>
            <RouteHandler {...this.props} />
          </Col>
        </Row>
      </div>
    );
  }

});
