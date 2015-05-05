var React = require("react");
var Searcher = require("./Searcher");

var app = document.getElementById("app");
var timerValue = 1;

var text = "-- empty --";
function handleSearcherChange(searcherText)
{
    text = searcherText;
    renderApp();
}

function renderApp() {

    var inlineStyles = { "fontSize": "20px", "border" : "solid 1px black" };

    React.render(
        <div>
            <Searcher onChange={handleSearcherChange} waitTimeout={10} />
            <div style={inlineStyles}><strong>Text:</strong> {text}</div>
        </div>,
        app);

}

renderApp();