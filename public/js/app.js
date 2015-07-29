/* global requirejs */

requirejs.config({
    paths: {
		'react': '../components/react/react-with-addons',
		'textfield': './react/textfield',
		'header': './react/header',
		'trigger': './react/mixins/trigger',
		'classnames': '../components/classnames/index'
    }
});

require(['react', 'textfield', 'header', 'model', 'decorator'], function (React, Textfield, Header, ReactModel, decorator) {
	'use strict';

	function controller(action /*, path */) {
		return function handle(e) {
			var textfield = ReactModel.textfield;
			// console.log(action,path,e.target.value);

			// update the model
			switch (action) {
				case 'CLEAR': textfield.value = ''; break;
				case 'UPDATE':
					textfield.value = e.target.value;
					if (textfield.value.length > 0 && !textfield.processed) {
						textfield.processed = true;
					}
					break;
			}

			// generate metadata based on updated model
			decorator(ReactModel);

			// update the component
			React.render(React.createFactory(Textfield)(textfield), document.getElementById('textfield'));

		};
	}

    var app = {
        initialize: function () {
            // Your code here
			var initialState = ReactModel;

			initialState.textfield.trigger = controller; // bind the controller once

			// test: alter the model
			// initialState.textfield.value = 'Guava';
			React.render(React.createFactory(Textfield)(initialState.textfield), document.getElementById('textfield'));
        }
    };

    app.initialize();

});