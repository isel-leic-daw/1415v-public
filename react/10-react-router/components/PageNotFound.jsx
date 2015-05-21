import React from "react";
import { Alert } from "react-bootstrap"
import { Link } from "react-router";

// PageNotFound
export default React.createClass(
{
  render: function() {
    return (
      <Alert bsStyle='warning'>
        <strong>Atenção:</strong> A página pedida não existe.<br/>
        <br/>
        Clique <Link to="root">aqui</Link> para ir para o início.
      </Alert>
    );
  }
});
