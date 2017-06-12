'use strict';

var cc = require('lodash.camelcase');
var isEl = require('is-el');

/**
 *
 * Constructor stores references to internal property names
 * to avoid overwrites of property names and methods
 * @return {null}
 *
 * @class
 * AutoId
 *
 * @classdesc
 * Utility to automatically query and cache DOM elements by their ids.
 * The cache can be cleared by calling the "refresh"method
 */
function AutoId () {
	this.refresh = this.refresh.bind(this);
	this._set = this._set.bind(this);
	this._protected = Object.getOwnPropertyNames(this);
	this._set();
}

/**
 * Query all DOM elements with an ID, caching
 * the results and avoiding collision by protecting
 * internal references from overwrite
 * @private
 */
AutoId.prototype._set = function () {
	/**
	 * Delete all existing internal references
	 * to DOM elements (clear the cache)
	 */
	Object.keys(this).forEach(id => {
		if (isEl(this[id])) {
			this[id] = null;
			delete this[id];
		}
	});

	/**
	 * Query the DOM and store references
	 * to all elements keyed off their IDs
	 */
	Array.prototype.slice
		.call(document.querySelectorAll('[id]'))
		.forEach(el => {
			if (!this._protected.includes(el.id)) {
				this[cc(el.id)] = el;
			}
		});
};

/**
 * Updates the page's DOM map by re-querying
 * and re-traversing the DOM
 * @return {null}
 */
AutoId.prototype.refresh = function () {
	this._set();
};

var shared = new AutoId();

module.exports = shared;
module.exports.AutoId = AutoId;
