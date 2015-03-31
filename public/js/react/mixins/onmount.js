/* global React */

'use strict';

return {
	componentDidMount: function triggerOnMount() {
		var props = this.props;

		if (props.onMount && typeof props.onMount === 'function') {
			props.onMount(React.findDOMNode(this));
		}
	}
};