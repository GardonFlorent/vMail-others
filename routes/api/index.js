/**
 * Created by Linneya on 12/08/2016.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('api/index', { title: 'vMail' });
});

module.exports = router;
