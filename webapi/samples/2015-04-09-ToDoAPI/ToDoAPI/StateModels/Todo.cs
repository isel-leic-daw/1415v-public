using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.NetworkInformation;
using System.Web;
using System.Web.UI;
using ToDoAPI.Store;

namespace ToDoAPI.StateModels
{
    public class TodoListState
    {
        public TodoListState(IEnumerable<Todo> todos, int page)
        {
            Items = todos.Select(t => new TodoState(t));
            Page = page;
        }

        public string Name { get { return "A Web API Design Methodology"; } } // TODO
        public int Page { get; set; }
        public IEnumerable<TodoState> Items { get; set; }
    }

    public class TodoState
    {
        public TodoState(Todo todo)
        {
            Name = todo.Title;
            ScheduledDate = todo.DueDate;
            Completed = todo.Completed;
        }

        public string Name { get; set; }
        public DateTime ScheduledDate { get; set; }
        public bool Completed { get; set; }
    }
}