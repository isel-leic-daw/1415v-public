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
        React.createElement("div", null, 
            React.createElement(TimerComponent, {initialValue: timerValue}), 
            React.createElement("hr", null), 
            React.createElement(TimerComponent, {initialValue: timerValue*2}), 
            React.createElement("hr", null), 
            React.createElement(Searcher, {onChange: handleSearcherChange}), 
            React.createElement("div", null, React.createElement("strong", null, "Text:"), " ", text)
        ),
        app);

}

renderApp();