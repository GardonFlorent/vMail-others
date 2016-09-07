/**
 * Created by Linneya on 20/08/2016.
 */

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/pluginDB');

module.exports = mongoose;