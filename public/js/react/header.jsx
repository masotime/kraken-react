(function (root, factory) {
	'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['react'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('react/addons'));
    }
})(this, function (React, TriggerMixin) {
	'use strict';
	return React.createClass({
		render: function () {
			return <h1>Test</h1>;
		}
	});
});