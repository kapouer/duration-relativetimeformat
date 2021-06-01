if (!Intl.RelativeTimeFormat) {
	const RTF = require('relative-time-format');
	RTF.addLocale(require('relative-time-format/locale/en.json'));
	Intl.RelativeTimeFormat = RTF;
}

const Duration = require('..');
const duree = new Duration('en');

const assert = require('assert');

function check(start, end, str) {
	assert.strictEqual(duree.format(new Date(start), new Date(end)), str);
}

describe("Unit tests", () => {
	let NOW;
	beforeEach(() => {
		NOW = Math.floor(Date.now() / 1000) * 1000;
	});
	it('should be now', function () {
		check(
			NOW,
			NOW,
			'now'
		);
	});

	it('should be now when before/after 30 seconds', function () {
		check(
			NOW + 29 * Duration.second,
			NOW,
			'now'
		);
		check(
			NOW,
			NOW + 29 * Duration.second,
			'now'
		);
	});

	it('should be in 31 seconds', function () {
		check(
			NOW + 31 * Duration.second,
			NOW,
			'in 31 seconds'
		);
	});

	it('should be 31 seconds ago', function () {
		check(
			NOW,
			NOW + 31 * Duration.second,
			'31 seconds ago'
		);
	});

	it('should be in 1 minute', function () {
		check(
			NOW + Duration.minute,
			NOW,
			'in 1 minute'
		);
	});

	it('should count 1mn29s as 1 minute', function () {
		check(
			NOW + Duration.minute + 29 * Duration.second,
			NOW,
			'in 1 minute'
		);
	});

	it('should be 3 hours ago', function () {
		check(
			NOW,
			NOW + 3 * Duration.hour,
			'3 hours ago'
		);
	});

	it('should be yesterday', function () {
		check(
			NOW - Duration.hour,
			NOW + Duration.day,
			'yesterday'
		);
	});

	it('should be yesterday too', function () {
		check(
			NOW - 23 * Duration.hour,
			NOW + Duration.day,
			'yesterday'
		);
	});

	it('should be 2 days ago', function () {
		check(
			NOW - Duration.day,
			NOW + Duration.day,
			'2 days ago'
		);
	});

	it('should be six days ago', function () {
		check(
			NOW,
			NOW + Duration.week - Duration.day,
			'6 days ago'
		);
	});

	it('should be last week', function () {
		check(
			NOW,
			NOW + Duration.week,
			'last week'
		);
	});

	it('should be last week too', function () {
		check(
			NOW,
			NOW + Duration.week + Duration.day,
			'last week'
		);
	});

	it('should be 2 weeks ago', function () {
		check(
			NOW,
			NOW + 2 * Duration.week,
			'2 weeks ago'
		);
	});

	it('should last month', function () {
		check(
			NOW,
			NOW + Duration.month,
			'last month'
		);
	});

	it('should next month', function () {
		check(
			NOW + Duration.month,
			NOW,
			'next month'
		);
	});

	it('should next year', function () {
		check(
			NOW + Duration.year,
			NOW,
			'next year'
		);
	});
});
