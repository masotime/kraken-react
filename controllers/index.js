'use strict';

var decorate = require('../public/js/decorator');

module.exports = function (router) {

    router.get('/', function (req, res) {

        var validators = {
            required: function(value) {
                return value.trim().length !== 0;
            }, 
            nonNumeric: function(value) {
                return value.match(/[0-9]+/);
            },
            noRepeated: function(value) {
                return !value.match(/(.)\1{3}/);
            },
            noSpaces: function(value) {
                return !value.match(/\s/);
            },
            minLength8: function(value) {
                return value.length < 8;
            },
            isCurrency: function(value) {
                return value.match(/^[0-9]{1,3}(?:,?[0-9]{3})*(?:\\.[0-9]*)?$/);
            }
        };

        function localizeValidator(validatorFn, message) {
            return function(value) {
                if (!validatorFn(value)) {
                    return message;
                }
            };
        }

        var content = {
            name: {
                label: 'Name',
                placeholder: 'e.g. Benjamin',
                tooltip: 'Provide your name for fun and laughter',
                error: {
                    required: 'Please enter your name',
                    nonNumeric: 'Your name should not have numbers'
                }
            },
            address: {
                label: 'Address',
                placeholder: 'e.g. 1310 N 1st Street',
                tooltip: 'Your mailbox will feel less lonely',
                error: {
                    required: 'Please enter an address'
                }
            },
            password: {
                label: 'Password',
                hint: {
                    minLength8: 'Enter at least 8 characters for your password'
                },
                error: {
                    minLength8: 'Your password should be at least 8 characters long',
                    noRepeated: 'Your password should not have more than 3 repeated characters'
                }
            }
        };

        var values = {
            name: '',
            address: '',
            password: '',
            inputs: [
                {
                    type: 'textfield',
                    data: {
                        name: 'name-of-textbox'
                    }
                },
                {
                    type: 'dropdown',
                    data: {
                        name: 'name-of-dropdown',
                        hasPricing: true,
                        hasFrequency: false,
                        options: [
                            { name: 'one', price: '23', frequency: '' },
                            { name: 'two', price: '99', frequency: '' },
                        ]
                    }
                }
            ]
        };

        // uses JSONPath
        var metadata = {
            name: {
                validators: ['required', 'nonNumeric']
            },
            address: {
                validators: ['minLength8']
            },
            password: {
                helpers: ['minLength8'],
                validators: ['noRepeated', 'minLength8']
            },
            'inputs[*].type': {
                validators: ['required']
            },
            'inputs[*].data.name': {
                validators: ['required']
            },
            'inputs[?(@.type=dropdown)].data.options[*].name': {
                validators: ['required']
            },
            'inputs[?(@.type=dropdown && @.hasPricing)].data.options[*].price': {
                validators: ['required', 'isCurrency']
            }
        };

        // assuming validators are in closure scope
        function prepareModel(values, metadata, content) {
            // transform metadata to functions
            var metadataClone = JSON.parse(JSON.stringify(metadata));
            Object.keys(metadataClone).for


        }

        var reactModel = {
            textfield: {
                processed: false,
                content: {
                    label: 'Name',
                    placeholder: 'e.g. Benjamin'
                },
                value: ''
            },
            name: {
                content: {
                    label: 'Address',
                    placeholder: 'e.g. 1310 N 1st Street'
                },
                value: ''
            }
        };

        var model = {
            reactModel: decorate(reactModel)
        };
        
        res.render('index', model);
    });

};