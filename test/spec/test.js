'use strict';

// https://github.com/substack/tape
const test = require('tape');
const AutoId = require('./../../').AutoId;

const div = document.createElement('div');
const protect = document.createElement('div');
div.setAttribute('id', 'tester');
protect.setAttribute('id', 'refresh');
document.body.appendChild(div);
document.body.appendChild(protect);

const autoId = new AutoId();

test('should be an object', function(assert) {
	assert.equal(typeof autoId, 'object');
	assert.end();
});

test('should store elements as properties keyed from ID', function(assert) {
	assert.equal(typeof autoId.tester, 'object');
	assert.end();
});

test('should cache elements', function(assert) {
	autoId.tester.setAttribute('id', 'no-tester');
	assert.equal(typeof autoId.tester, 'object');
	assert.end();
});

test('should clear cache', function(assert) {
	autoId.refresh();
	assert.equal(typeof autoId.tester, 'undefined');
	assert.end();
});

test('should re-query post-refresh call', function(assert) {
	var d = document.createElement('div');
	d.id = "newtester";
	document.body.appendChild(d);
	autoId.refresh();
	assert.equal(typeof autoId.newtester, 'object');
	assert.end();
});

test('should camelCase kebab\'ed IDs', function(assert) {
	assert.equal(typeof autoId.noTester, 'object');
	assert.end();
});

test('should protect internal props against matching selectors', function(assert) {
	assert.equal(typeof autoId.refresh, 'function');
	assert.end();
});

window.close();
