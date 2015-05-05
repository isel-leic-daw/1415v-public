var React = require("react");
var Todos = require("./Todos");

var app = document.getElementById("app");
renderApp(app);


function renderApp(app)
{
    React.render(
        <div>
            <Todos />
        </div>,
        app);
}