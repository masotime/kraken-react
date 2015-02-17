'use strict';

requirejs.config({
    paths: {
    	'react': '../components/react/react-with-addons.min',
    	'textfield': './react/textfield',
    	'header': './react/header',
    	'trigger': './react/mixins/trigger'
    }
});

require(['react', 'textfield', 'header'], function (React, Textfield, Header) {

    var app = {
        initialize: function () {
            // Your code here
            React.render(React.createFactory(Header)({
            	// no props
            }), document.getElementById('header'));

            React.render(React.createFactory(Textfield)({
            	label: 'Label',
            	placeholder: 'Placeholder',
            	errors: [],
            	hints: [],
            	value: 'Something'
            }), document.getElementById('textfield'));
        }
    };

    app.initialize();

});
