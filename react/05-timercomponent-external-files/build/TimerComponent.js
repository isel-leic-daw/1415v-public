
// Using CommonJS components (i.e. module.exports & require("component"))
var React = require("react");

module.exports = React.createClass(
{displayName: "exports",
    getInitialState: function()
    {
        return {
            value: this.props.initialValue
        }
    },

    componentWillMount: function(){
        this._timer = setInterval(
            this._updateTimerValue,
            1000
        );
    },
    componentWillUnmount: function() {
        clearInterval(this._timer);
    },

    render: function()
    {

        return React.createElement("div", null, "Time: ", this.state.value)
    },

    _timer: 0,
    _updateTimerValue: function()
    {
       this.setState({ value: this.state.value+1 });
    },

});