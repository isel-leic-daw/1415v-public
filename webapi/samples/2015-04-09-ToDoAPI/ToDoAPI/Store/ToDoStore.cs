using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices.WindowsRuntime;
using System.Web;

namespace ToDoAPI.Store
{
    public class Todo
    {
        public Todo(int id, string title, DateTime dueDate, bool completed = false)
        {
            Id = id;
            Title = title;
            DueDate = dueDate;
            Completed = completed;
        }

        public int Id { get; set; }
        public string Title { get; set; }
        public DateTime DueDate { get; set; }
        public bool Completed { get; set; }

    }

    public class ToDoStore
    {
        private static IEnumerable<Todo> todos = new[]
        {
            new Todo(1, "List all the parts", DateTime.Now.AddDays(-2), true),
            new Todo(2, "Draw state diagrams", DateTime.Now.AddDays(-1)),
            new Todo(3, "Reconcile magic strings", DateTime.Now.AddDays(0)),
            new Todo(4, "Select a media type", DateTime.Now.AddDays(1)),
            new Todo(5, "Create a semantic profile", DateTime.Now.AddDays(2)),
            new Todo(6, "Write some code", DateTime.Now.AddDays(3)),
            new Todo(7, "Publish your API", DateTime.Now.AddDays(4)),
        };

        public const int PAGE_SIZE = 3;

        public IEnumerable<Todo> GetAll(int page = 1)
        {
            return todos
                    .Skip(PAGE_SIZE * (page-1))
                    .Take(PAGE_SIZE);
        }

        public Todo GetById(int id)
        {
            return todos.SingleOrDefault(_ => _.Id == id);
        }
    }
}