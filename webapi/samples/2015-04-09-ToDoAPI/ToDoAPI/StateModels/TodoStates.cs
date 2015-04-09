using System;
using System.Collections.Generic;
using System.Linq;
using HalJsonNet.Configuration;
using HalJsonNet.Configuration.Attributes;
using HalJsonNet.Configuration.Interfaces;
using Newtonsoft.Json;
using ToDoAPI.Store;

namespace ToDoAPI.StateModels
{
    public class TodoListState : IHaveHalJsonLinks
    {
        private readonly int _pageSize;

        public TodoListState(IEnumerable<Todo> todos, int page, int pageSize)
        {
            _pageSize = pageSize;
            Items = todos.Select(t => new TodoState(t));
            Page = page;
        }

        public string Name { get { return "A Web API Design Methodology"; } } // TODO
        public int Page { get; set; }

        [HalJsonEmbedded("items")]
        public IEnumerable<TodoState> Items { get; set; }

        public IDictionary<string, Link> GetLinks()
        {
            var dic = new Dictionary<string, Link>();
            if(Page > 1) dic.Add("prev", new Link("/api/todo?page=" + (Page-1)));
            dic.Add("next", new Link("/api/todo?page=" + (Page+1)));
            dic.Add("first", new Link("/api/todo"));
            dic.Add("find", new Link("/api/todo{?id}", templated: true));
            return dic;
        }

        public IDictionary<string, Embedded> GetEmbedded()
        {
            throw new NotImplementedException();
        }
    }

    public class TodoState
    {
        public TodoState(Todo todo)
        {
            Id = todo.Id;
            Name = todo.Title;
            ScheduledDate = todo.DueDate;
            Completed = todo.Completed;
        }

        [JsonIgnore]
        public int Id { get; set; }

        public string Name { get; set; }
        public DateTime ScheduledDate { get; set; }
        public bool Completed { get; set; }
    }
}