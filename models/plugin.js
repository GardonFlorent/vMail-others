/**
 * Created by Linneya on 20/08/2016.
 */

var mongoose = require('mongoose');

var schemaModel = new mongoose.Schema({
    name: String,
    registryName: String,
    type: String,
    dependOn: String,
    author: String,
    version: String,
    creationDate: { type: Date, default: Date.now },
});

var plugin = function () {
    //MongoDB schema
    this.schema = mongoose.model('Plugin', schemaModel);
}

plugin.prototype.find = function (criteria, attribute, typeSort) {
    var pluginCollection = null
    if (criteria) {
        this.schema.find(criteria ,function (err, plugins) {
            if (err) return console.error(err);
            pluginCollection = plugins;
        })
    } else {
        this.schema.find(function (err, plugins) {
            console.log("Getting all!");
            if (err) return console.error(err);
            pluginCollection = plugins;
        })
    }
    console.log(pluginCollection);
    return pluginCollection;
}

plugin.prototype.findAll = function (attribute, typeSort) {
    return this.find(null, attribute, typeSort);
}

plugin.prototype.update = function (cond, todo, isUnique, opt, callback) {
    if(isUnique) {
        this.schema.findOneAndUpdate(cond, todo, opt, callback);
    } else {
        this.schema.update(cond, todo, opt, callback);
    }
}

plugin.prototype.remove = function (cond, opt, isByID, callback) {
    if (isByID) {
        this.schema.findByIdAndRemove(id, opt, callback);
    } else {
        if (opt) {
            this.schema.findOneAndRemove(cond, opt, callback);
        } else {
            this.schema.remove(cond, callback);
        }
    }
}

plugin.prototype.add = function (pluginSchema) {
    var toReturn = null;
    this.schema.create(pluginSchema , function (err, data) {
        if (err) return next(err);
        toReturn = data;
    })
    return toReturn;
}

module.exports = plugin;