'use strict';

var chalk = require('chalk');

var objectTypes = [
	'Object',
	'Array',
	'ArrayBuffer',
	'DataView',
	'Float32Array',
	'Float64Array',
	'Int8Array',
	'Int16Array',
	'Int32Array',
	'Uint8Array',
	'Uint8ClampedArray',
	'Uint16Array',
	'Uint32Array',
	'arguments',
	'Map',
	'Set',
	'WeakMap',
	'WeakSet'
];

function highlightObject(obj) {
	return obj
		.split('\n')
		.map(function (line) {
			objectTypes.forEach(function (type) {
				if (line.indexOf(type) >= 0) {
					line = line.replace(type, chalk.blue(type));
				}
			});

			line = line.replace(/ \[/, chalk.grey(' ['));
			line = line.replace(/ ]/, chalk.grey(' ]'));
			line = line.replace(/ \{/, chalk.grey(' {'));
			line = line.replace(/ \}/, chalk.grey(' }'));
			line = line.replace(/"(.+)":/, function ($1, $2) {
				return chalk.white($2 + ':');
			});
			line = line.replace(/([0-9]+),/, function ($1, $2) {
				return chalk.yellow($2) + ',';
			});
			line = line.replace(/"(.+)",/, function ($1, $2) {
				return chalk.green('"' + $2 + '"') + ',';
			});
			line = line.replace(/,$/, chalk.grey(','));

			return line;
		})
		.join('\n');
}

module.exports = function (obj, type) {
	if (type === 'boolean' || type === 'number') {
		return chalk.yellow(obj);
	}

	if (type === 'string') {
		return chalk.green(obj);
	}

	if (type === 'object' || type === 'array') {
		return highlightObject(obj);
	}

	return obj;
};
