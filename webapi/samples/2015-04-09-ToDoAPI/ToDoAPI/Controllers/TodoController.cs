using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ToDoAPI.StateModels;
using ToDoAPI.Store;

namespace ToDoAPI.Controllers
{
    public class ToDoController : ApiController
    {
        [Route("api/todo", Name = "GetAllTodos")]
        public TodoListState Get()
        {
            var store = new ToDoStore();
            var todos = store.GetAll(1);

            var todoListState = new TodoListState(todos, 1);
            return todoListState;
        }

        [Route("api/todo/{id}", Name = "GetTodoById")]
        public HttpResponseMessage GetById(int id)
        {
            var store = new ToDoStore();
            var todo = store.GetById(id);
            if (todo == null)
                return Request.CreateResponse(HttpStatusCode.NotFound);

            var todoState = new TodoState(todo);

            return Request.CreateResponse(todoState);
        }

    }
}
