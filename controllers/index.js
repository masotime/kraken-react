'use strict';

var decorate = require('../public/js/decorator');

module.exports = function (router) {

    router.get('/', function (req, res) {

        var reactModel = {
            textfield: {
                processed: false,
                content: {
                    label: 'Name',
                    placeholder: 'e.g. Benjamin'
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