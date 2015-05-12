import React from "react";
import Todos from "./Todos";
import { Alert, Navbar, Nav, NavItem, DropdownButton, MenuItem, Col, Row } from "react-bootstrap";

var app = document.getElementById("app");

const mainNavBar = (
  <Navbar brand='TODO Lists' >
    <Nav>
      <NavItem eventKey={1} href='#'>About</NavItem>
      <NavItem eventKey={2} href='#'>Settings</NavItem>
      <DropdownButton eventKey={3} title='Options' >
        <MenuItem eventKey='1'>Option A</MenuItem>
        <MenuItem eventKey='2'>Option B</MenuItem>
        <MenuItem divider />
        <MenuItem eventKey='4'>Option C</MenuItem>
      </DropdownButton>
    </Nav>
  </Navbar>
);

renderApp(app);


function renderApp(app)
{
    React.render(
        <div>
            {mainNavBar}
            <div className="container">
                <Alert>Bem-vindo à aplicação de exemplo de TODOs.</Alert>
                <Row>
                  <Col md={6}>
                    <Todos listName="shopping" />
                  </Col>
                  <Col md={6}>
                    <Todos listName="books" />
                  </Col>
                </Row>
                <Row>
                  <Col md={4}>
                    <Todos listName="books" />
                  </Col>
                  <Col md={4}>
                    <Todos listName="travel" />
                  </Col>
                  <Col md={4}>
                    <Todos listName="shopping" />
                  </Col>
                </Row>

            </div>
        </div>,
        app);
}