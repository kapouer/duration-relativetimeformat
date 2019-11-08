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

it('should be now when before/after 30 seconds', function() {
	assert.equal(Duration('en')(new Date(Date.now() + 29 * Duration.second)), 'now');
	assert.equal(Duration('en')(new Date(), new Date(Date.now() + 29 * Duration.second)), 'now');
});

it('should be in 31 seconds', function() {
	assert.equal(Duration('en')(new Date(Date.now() + 31 * Duration.second)), 'in 31 seconds');
});

it('should be 31 seconds ago', function() {
	assert.equal(Duration('en')(new Date(), new Date(Date.now() + 31 * Duration.second)), '31 seconds ago');
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
	assert.equal(Duration('en')(new Date(Date.now() - Duration.hour), new Date(Date.now() + Duration.day)), 'yesterday');
});

it('should be yesterday', function() {
	assert.equal(Duration('en')(new Date(Date.now() - 23 * Duration.hour), new Date(Date.now() + Duration.day)), 'yesterday');
});

it('should be 2 days ago', function() {
	assert.equal(Duration('en')(new Date(Date.now() - 24 * Duration.hour), new Date(Date.now() + Duration.day)), '2 days ago');
});

it('should last month', function() {
	assert.equal(Duration('en')(new Date(), new Date(Date.now() + Duration.month)), 'last month');
});

it('should next month', function() {
	assert.equal(Duration('en')(new Date(Date.now() + Duration.month)), 'next month');
});
