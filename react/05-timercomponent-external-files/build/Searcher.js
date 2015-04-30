
var React = require("react");

module.exports = React.createClass(
{displayName: "exports",
    getInitialState: function()
    {
        return { text: "Hello" }
    },


    handleChange: function(evt)
    {
        this.setState({text: evt.target.value });
        this.props.onChange(evt.target.value);
    },

    render: function()
    {
        return React.createElement("input", {type: "text", value: this.state.text, onChange: this.handleChange})
    },

});