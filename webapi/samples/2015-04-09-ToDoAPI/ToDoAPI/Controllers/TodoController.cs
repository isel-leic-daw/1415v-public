using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ToDoAPI.Store;

namespace ToDoAPI.Controllers
{
    public class ToDoController : ApiController
    {
        [Route("api/todo", Name = "GetAllTodos")]
        public IEnumerable<Todo> Get()
        {
            var store = new ToDoStore();
            var todos = store.GetAll(1);
            return todos;
        }

        [Route("api/todo/{id}", Name = "GetTodoById")]
        public HttpResponseMessage GetById(int id)
        {
            var store = new ToDoStore();
            var todo = store.GetById(id);
            if (todo == null)
                return Request.CreateResponse(HttpStatusCode.NotFound);

            return Request.CreateResponse(todo);
        }

    }
}
