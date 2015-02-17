(function (root, factory) {
	'use strict';
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.returnExports = factory();
    }
})(this, function () {
	'use strict';
	return (function factory() {

		// these are utility functions that are agnostic to "this"
		function navigate(obj, trail) {
			if (trail.length <= 1 || !obj.hasOwnProperty(trail[0])) {
				return { obj: obj, key: trail[0] };
			} else {
				return navigate(obj[trail[0]], trail.slice(1));
			}
		}

		function update(obj, path, value) {
			var parts = path.split('.');
			var nav = navigate(obj, parts);
			if (nav.obj.hasOwnProperty(nav.key)) {
				nav.obj[nav.key] = value;
			} else if (parts.length > 1) {
				path = parts.slice(0,-2).concat([parts[parts.length-1]]).join('.');
				// console.log('Key not found, trying',path,'instead');
				update(obj, path, value);
			}
		}

		function remove(obj, path) {
			var nav = navigate(obj, path.split('.')),
	            parentObj = nav.obj,
	            key = nav.key;

	        // respond according to the type
	        if (Array.isArray(parentObj)) {
	            parentObj.splice(key,1);
	        } else {
	            delete parentObj.key;
	        }
		}

		var util = {
			navigate: navigate,
			update: update,
			remove: remove
		};

		return {
			trigger: function(action, componentPath) {
				var upstreamTrigger = this.props.trigger,
					ownPath = this.props.jsonPath;

				return function onChange(value) {
					var upstreamPath = [ownPath, componentPath].reduce(function (acc, current) {
						var wellFormedPath = current !== undefined && current.toString().length > 0;
						return wellFormedPath && acc.concat(current.toString().split('.')) || acc;
					}, []).join('.');

					if (upstreamTrigger) {
						upstreamTrigger(action, upstreamPath)(value);
					}
				};
			},
			handleWith: function handleWith(handler) {
				return function cascader(action, path) {
					return function handle(value) {
						// React automagically binds "this" to the function so we don't have to care
						// about this references in the handler
						handler(action, path, value, util);
					};
				};
			}
		};
	}());
});