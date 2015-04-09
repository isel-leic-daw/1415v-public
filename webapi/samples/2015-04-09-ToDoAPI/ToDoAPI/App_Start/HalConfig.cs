using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Web.Http;
using HalJsonNet;
using HalJsonNet.Serialization;
using ToDoAPI.StateModels;

namespace ToDoAPI
{
    public static class HalConfig
    {
        public static void Configure(HttpConfiguration config)
        {
            // Configure HalJsonNet
            // 
            // https://github.com/kekekeks/hal-json-net/
            //
#if DEBUG
            var halJsonConfig = new HalJsonConfiguration("http://localhost:49255");
#else
            var halJsonConfig = new HalJsonConfiguration();
#endif
            // We can configure links (and embedded) using this Fluent API
            halJsonConfig.Configure<TodoState>()
                .Link("self", t => "/api/todo/" + t.Id)
                .Link("all", "/api/todo");

            config.Formatters.JsonFormatter.SerializerSettings.ContractResolver = new JsonNetHalJsonContactResolver(halJsonConfig);
            // Swashbuckle 5.0, unable to generate swagger json for web api 2
            // https://github.com/domaindrivendev/Swashbuckle/issues/186
            // --> Should be fixed in latest release (5.0.1) !
            // --> Need further investigation

            config.Formatters.JsonFormatter.SupportedMediaTypes.Add(new MediaTypeHeaderValue("application/hal+json"));

        }
    }
}
