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
            title: 'Kraken React',
            reactModel: decorate(reactModel)
        };

        res.render('index', model);
    });

};