'use strict';
var cleanYamlObject = require('clean-yaml-object');
var ErrorStackParser = require('error-stack-parser');
var prettyFormat = require('pretty-format');
var beautifyStack = require('./beautify-stack');

function filter(propertyName, isRoot, source, target) {
	if (!isRoot) {
		return true;
	}

	if (propertyName === 'stack') {
		target.stack = beautifyStack(source.stack);
		return false;
	}

	if (propertyName === 'actual' || propertyName === 'expected') {
		target[propertyName + 'Type'] = typeof source[propertyName];
		target[propertyName] = prettyFormat(source[propertyName]);
		return false;
	}

	return true;
}

module.exports = function (error) {
	var err = cleanYamlObject(error, filter);

	var source = ErrorStackParser.parse(error)[1];
	err.source = {
		file: source.fileName,
		line: source.lineNumber
	};

	return err;
};
