
var React = require("react");
require("./Searcher.css");

module.exports = React.createClass(
{
    propTypes: {
        onChange: React.PropTypes.func.isRequired,
        waitTimeout: React.PropTypes.number,
    },

    getDefaultProps() {
        return {
            waitTimeout: 400
         }
    },

    getInitialState()
    {
        return { text: "Write here some text" }
    },


    handleChange(evt)
    {
        this.setState({text: evt.target.value });

        if(this._timer) clearTimeout(this._timer);
        this._timer = setTimeout(this._fireOnChange, this.props.waitTimeout);
    },

    render()
    {
        return <input className="searcher-red"
                      type="text" value={this.state.text}
                      onChange={this.handleChange} />
    },

    _timer: 0,
    _fireOnChange()
    {
        this.props.onChange(this.state.text);
    }

});