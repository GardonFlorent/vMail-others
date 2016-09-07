/**
 * Created by Linneya on 14/08/2016.
 */
const PORT = 3000;
//var db = exports.db = require('../db')();
var assert = require('assert')
    , app = require('../app')
    , plugin = {
    "title": "APlugin",
    "author":   "AnAuthor",
    "dependOn":  "AnUpperPLugin"
}
    , expected_id = 1

// Configure REST API host & URL
require('api-easy')
    .describe('vMail-rest')
    .use('localhost', PORT)
    .root('/api/plugins')
    .setHeader('Content-Type', 'application/json')
    .setHeader('Accept', 'application/json')

    // Initially: start server
    .expect('Start server', function () {
        app.db.configure({namespace: 'plugins-test-rest'});
        app.listen(PORT);
    }).next()

// 1. Empty database
    .del()
    .expect(200)
    .next()

    // 2. Add a new plugin
    .post(plugin)
    .expect('Has ID', function (err, res, body) {
        var obj = null;
        assert.doesNotThrow(function() { obj = JSON.parse(body) }, SyntaxError);
        assert.isObject(obj);
        assert.include(obj, 'id');
        assert.equal(expected_id, obj.id);
        plugin.id = obj.id;
    })
    .undiscuss().next()

// 3.1. Check that the freshly created plugin appears
    .get()
    .expect('Collection', function (err, res, body) {
        var obj = null;
        assert.doesNotThrow(function() { obj = JSON.parse(body) }, SyntaxError);
        assert.isArray(obj);
        assert.include(obj, '/' + expected_id);
    })

    // 3.2. Get the freshly created plugin
    .get('/' + expected_id)
    .expect('Found plugin', function (err, res, body) {
        var obj = null;
        assert.doesNotThrow(function() { obj = JSON.parse(body) }, SyntaxError);
        assert.deepEqual(obj, plugin);
    })
    .next()

    // 4. Update plugin
    .put('/' + expected_id, {"author": "AnotherAuthor"})
    .expect('Updated plugins', function (err, res, body) {
        var obj = null;
        assert.doesNotThrow(function() { obj = JSON.parse(body) }, SyntaxError);
        plugin.title = "AnotherAuthor";
        assert.deepEqual(obj, plugin);
    })
    .next()

    // 5. Delete plugin
    .del('/' + expected_id)
    .expect(200)
    .next()

    // 6. Check deletion
    .get('/' + expected_id)
    .expect(404)
    .next()

    // 7. Check all plugins are gone
    .get()
    .expect('Empty database', function (err, res, body) {
        var obj = null;
        assert.doesNotThrow(function() { obj = JSON.parse(body) }, SyntaxError);
        assert.isArray(obj);
        assert.equal(obj.length, 0);
    })

    // 8. Test unallowed methods
    .post('/' + expected_id).expect(405)
    .put().expect(405)

// Finally: clean, and stop server
    .expect('Clean & exit', function () {
        app.db.deleteAll(function () { app.close() });
    })

    // Export tests for Vows
    .export(module)