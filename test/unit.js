if (!Intl.RelativeTimeFormat) {
	const RTF = require('relative-time-format');
	RTF.addLocale(require('relative-time-format/locale/en.json'));
	Intl.RelativeTimeFormat = RTF;
}

const Duration = require('..');

var assert = require('assert');

it('should be now', function() {
	assert.equal(Duration('en')(new Date()), 'now');
});

it('should be in 1 minute', function() {
	assert.equal(Duration('en')(new Date(Date.now() + Duration.minute)), 'in 1 minute');
});

it('should be in 1 minute', function() {
	assert.equal(Duration('en')(new Date(Date.now() + Duration.minute + 31 * Duration.second)), 'in 1 minute');
});

it('should be 3 hours ago', function() {
	assert.equal(Duration('en')(new Date(), new Date(Date.now() + 3 * Duration.hour)), '3 hours ago');
});

it('should be yesterday', function() {
	assert.equal(Duration('en')(new Date(), new Date(Date.now() + Duration.day)), 'yesterday');
});

it('should last month', function() {
	assert.equal(Duration('en')(new Date(), new Date(Date.now() + Duration.month)), 'last month');
});

it('should next month', function() {
	assert.equal(Duration('en')(new Date(Date.now() + Duration.month)), 'next month');
});
