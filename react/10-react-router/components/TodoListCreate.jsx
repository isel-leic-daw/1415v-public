import React    from "react";
import { Badge, Label, Input, ButtonInput, Panel, Col, Row } from "react-bootstrap"
import Router, { Link, RouteHandler } from "react-router";

import TodosStore from "./../stores/TodosStore";

// TodoListCreate
export default React.createClass(
{
  contextTypes: { router: React.PropTypes.func },

  render()
  {
    return (
      <Panel header={<strong>Criar lista</strong>}>
        <form className='form-horizontal'>
          <Input type='text' label='id'   ref="id" placeholder='Id'   labelClassName='col-xs-2' wrapperClassName='col-xs-10' />
          <Input type='text' label='name' ref="name" placeholder='Nome' labelClassName='col-xs-2' wrapperClassName='col-xs-10' />
          <ButtonInput onClick={this.handleCreateList} className="pull-right btn-primary" type='submit' value='Criar' wrapperClassName='col-xs-12' />
        </form>
      </Panel>
    );
  },

  handleCreateList(evt)
  {
    evt.preventDefault();
    let id = this.refs.id.getValue();
    let name = this.refs.name.getValue();

    if(id != "" && name != "") {
      TodosStore.createList(this.refs.id.getValue(), name);
      this.context.router.transitionTo("todo", { id: id });
    }

  }



});
