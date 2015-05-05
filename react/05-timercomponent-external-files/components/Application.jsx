/** @jsx React.DOM */

var React = require("react");
var TimerComponent = require("./TimerComponent");
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

    React.render(
        <div>
            <TimerComponent initialValue={timerValue} />
            <hr />
            <TimerComponent initialValue={timerValue*2} />
            <hr />
            <Searcher onChange={handleSearcherChange} />
            <div><strong>Text:</strong> {text}</div>
        </div>,
        app);

}

renderApp();