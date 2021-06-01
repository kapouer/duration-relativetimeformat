if (!Intl.RelativeTimeFormat) {
	const RTF = require('relative-time-format');
	RTF.addLocale(require('relative-time-format/locale/en.json'));
	Intl.RelativeTimeFormat = RTF;
}

const Duration = require('..');

const assert = require('assert');

describe("Unit tests", () => {
	let NOW;
	beforeEach(() => {
		NOW = Math.floor(Date.now() / 1000) * 1000;
	});
	it('should be now', function () {
		assert.equal(Duration('en')(new Date()), 'now');
	});

	it('should be now when before/after 30 seconds', function () {
		assert.equal(Duration('en')(new Date(NOW + 29 * Duration.second)), 'now');
		assert.equal(Duration('en')(new Date(), new Date(NOW + 29 * Duration.second)), 'now');
	});

	it('should be in 31 seconds', function () {
		assert.equal(Duration('en')(new Date(NOW + 31 * Duration.second), new Date(NOW)), 'in 31 seconds');
	});

	it('should be 31 seconds ago', function () {
		assert.equal(Duration('en')(new Date(NOW), new Date(NOW + 31 * Duration.second)), '31 seconds ago');
	});

	it('should be in 1 minute', function () {
		assert.equal(Duration('en')(new Date(NOW + Duration.minute), new Date(NOW)), 'in 1 minute');
	});

	it('should be in 1 minute too', function () {
		assert.equal(Duration('en')(new Date(NOW + Duration.minute + 31 * Duration.second)), 'in 1 minute');
	});

	it('should be 3 hours ago', function () {
		assert.equal(Duration('en')(new Date(NOW), new Date(NOW + 3 * Duration.hour)), '3 hours ago');
	});

	it('should be yesterday', function () {
		assert.equal(Duration('en')(new Date(NOW - Duration.hour), new Date(NOW + Duration.day)), 'yesterday');
	});

	it('should be yesterday too', function () {
		assert.equal(Duration('en')(new Date(NOW - 23 * Duration.hour), new Date(NOW + Duration.day)), 'yesterday');
	});

	it('should be 2 days ago', function () {
		assert.equal(Duration('en')(new Date(NOW - 24 * Duration.hour), new Date(NOW + Duration.day)), '2 days ago');
	});

	it('should be six days ago', function () {
		assert.equal(Duration('en')(new Date(NOW), new Date(NOW + Duration.week - Duration.day)), '6 days ago');
	});

	it('should be last week', function () {
		assert.equal(Duration('en')(new Date(NOW), new Date(NOW + Duration.week)), 'last week');
	});

	it('should be last week too', function () {
		assert.equal(Duration('en')(new Date(NOW), new Date(NOW + Duration.week + Duration.day)), 'last week');
	});

	it('should be 2 weeks ago', function () {
		assert.equal(Duration('en')(new Date(NOW), new Date(NOW + 2 * Duration.week)), '2 weeks ago');
	});

	it('should last month', function () {
		assert.equal(Duration('en')(new Date(NOW), new Date(NOW + Duration.month)), 'last month');
	});

	it('should next month', function () {
		assert.equal(Duration('en')(new Date(NOW + Duration.month), new Date(NOW)), 'next month');
	});

	it('should next year', function () {
		assert.equal(Duration('en')(new Date(NOW + Duration.year), new Date(NOW)), 'next year');
	});
});
