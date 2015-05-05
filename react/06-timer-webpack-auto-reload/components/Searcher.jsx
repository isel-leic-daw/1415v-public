/** @jsx React.DOM */

var React = require("react");

module.exports = React.createClass(
{
    getInitialState: function()
    {
        return { text: "Write here some text" }
    },


    handleChange: function(evt)
    {
        this.setState({text: evt.target.value });
        this.props.onChange(evt.target.value);
    },

    render: function()
    {
        return <input type="text" value={this.state.text} onChange={this.handleChange} />
    },

});