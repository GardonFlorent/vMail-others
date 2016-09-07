/**
 * Created by Linneya on 12/08/2016.
 */
var express = require('express');
var router = express.Router();
var plugin = require('../../models/plugin');

var sortByField = function (data, field, isDesc) {
    data.sort(function (el1, el2) {
        if (el1[field] && el2[field]) { return el1[field].localeCompare(el2[field]) * (isDesc)? -1 : 1; }
    })
}

router.get('/', function(req, res, next) {
    var pluginAll = new plugin();
    pluginAll.schema.find(function (err, data) {
        if (err) {res.json(err); next();};
        res.json(data);
        next();
    });
});

router.get('/:sort', function (req, res, next) {
    var pluginAll = new plugin();
    pluginAll.schema.find(function (err, data) {
            if (err) {res.json(err); next();};
        switch (req.params.sort) {
            case 'name':
                data.sort(function (el1, el2) {
                    if (el1[req.params.sort] && el2[req.params.sort]) { return el1[req.params.sort].localeCompare(el2[req.params.sort]); }
                });
            break;
            case 'registryName':
                data.sort(function (el1, el2) {
                    if (el1[req.params.sort] && el2[req.params.sort]) { return el1[req.params.sort].localeCompare(el2[req.params.sort]); }
                });
            break;
            case 'author':
                data.sort(function (el1, el2) {
                    if (el1[req.params.sort] && el2[req.params.sort]) { return el1[req.params.sort].localeCompare(el2[req.params.sort]); }
                });
            break;
        }
        res.json(data);
        next();
    });
});



router.post('/', function (req, res, next) {
    console.log(req.body);
    var pluginToAdd = new plugin();
    var schema = new pluginToAdd.schema(req.body);
    schema.save(function(err){
        if(err)
            console.log(err);
        else
            res.json(schema);
    });
})

module.exports = router;