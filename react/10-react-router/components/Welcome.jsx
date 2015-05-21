import React from "react";
import { Alert } from "react-bootstrap"
import { Link } from "react-router";

// Welcome
export default React.createClass(
{
  render: function() {
    return (
      <Alert>
        <strong>Bem-vindo</strong> à aplicação de Listas de Todos.
        Começe <Link to="todos">aqui</Link>.
      </Alert>
    );
  }
});
