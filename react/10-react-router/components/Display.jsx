import React from "react";

const Display = React.createClass(
{
    propTypes: {
        when: React.PropTypes.bool.isRequired,
        strict: React.PropTypes.bool
    },

    getDefaultProps: function() {
        return {
            strict: true
        };
    },

    render()
    {
        if(!this.props.children) throw new Error("Invariant Violation: Display SHOULD have one or two child elements.")
        const childs = this.props.children instanceof Array ? this.props.children : [this.props.children];
        if(childs.length > 2) throw new Error(`Invariant Violation: Display have ${childs.length} childs. It SHOULD have one or two childs.`);

        if(this.props.when) return childs[0];
        if(childs.length > 1) return childs[1];
        if(this.props.strict) throw new Error("Invariant Violation: Display condition's is FALSE and the second child is not defined. Maybe you should disable default strict mode ( strict={true} ).")
        return <span></span>;
    }
});

export default Display;