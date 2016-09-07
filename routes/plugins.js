var express = require('express');
var router = express.Router();

var plugin = require('../models/plugin');

/* GET users listing. */
router.get('/', function(req, res, next) {
  var pluginSearch = new plugin();
  pluginSearch.schema.find(function (err, data) {
    if (err) {res.render('error', {title: err.title, status: err.status, stack: err.message}); next();};
    res.render('plugins', {title: 'List of Plugins', plugins: data});
  });
});

module.exports = router;
