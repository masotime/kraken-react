/* global module, define */
'use strict';
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.returnExports = factory();
    }
})(this, function () {
	return function decorator(model) {

		// decorate only textfield for now
		var textfield = model.textfield;
		// console.log(action,path,e.target.value);

		textfield.errors = [];
		textfield.hints = [];

		if (textfield.processed) {
			if (textfield.value.length === 0) {
				textfield.errors.push('Please enter something');
			} else if (textfield.value.match(/[0-9]+/)) {
				textfield.errors.push('Field cannot have numbers');
			}
		}

		textfield.hints.push('Use this field with alphabets only');

		return model;

	};
});