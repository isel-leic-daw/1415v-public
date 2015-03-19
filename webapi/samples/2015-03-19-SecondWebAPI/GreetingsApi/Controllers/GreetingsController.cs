using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace GreetingsApi.Controllers
{
    public class Greeting
    {
        public string Name { get; set; }
        public string Message { get; set; }
    }

    public class GreetingsController : ApiController
    {
        public static IList<Greeting> Greetings = new List<Greeting>()
        {
            new Greeting() { Name = "Manhã", Message = "Bom dia!" },
            new Greeting() { Name = "Tarde", Message = "Boa tarde!" },
            new Greeting() { Name = "Noite", Message = "Boa noite!" },
        };

        public IEnumerable<Greeting> Get()
        {
            return Greetings;
        }
        
        public Greeting Get(string name)
        {
            var greeting = Greetings.SingleOrDefault(_ => _.Name == name);
            if (greeting == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            return greeting;
        }
        public HttpResponseMessage Post([FromBody] Greeting g)
        {
            var greeting = new Greeting() { Name = g.Name, Message = g.Message };
            Greetings.Add(greeting);
            return this.Request.CreateResponse(HttpStatusCode.OK, greeting);
        }
    }
}
