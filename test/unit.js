

const Duration = require('..');
const duree = new Duration('en');

const assert = require('assert');

function str2date(str) {
	let [date, htime] = str.split("T");
	if (!date) date = "2021-07-14";
	if (!htime) htime = "12:00:00.000";
	let [time, millis] = htime.split(".");
	if (!millis) millis = "000";
	return new Date([date, [time, millis].join(".")].join("T"));
}

function check(from, to, str) {
	assert.strictEqual(duree.format(str2date(to), str2date(from)), str);
}

describe("Unit tests", () => {

	it('should be now', function () {
		assert.strictEqual(duree.format(new Date()), "now");
		check("T18:05:32", "T18:05:32", 'now');
		check(".000", ".500", 'now');
		check(".999", ".000", 'now');
		check("T12:00:50", "T12:01:02", 'now');
		check("T12:01:10", "T12:00:50", 'now');
	});

	it('should be this minute', function () {
		check("T12:00:10", "T12:00:51", 'this minute');
		check("T12:00:51", "T12:00:10", 'this minute');
	});

	it('should be 1 minute', function () {
		check("T12:00:50", "T12:01:12", 'in 1 minute');
		check("T12:00:01", "T12:01:30", 'in 1 minute');
		check("T12:00:01", "T12:01:00", 'in 1 minute');
		check("T12:01:00", "T12:00:01", '1 minute ago');
		check("T12:01:30", "T12:00:01", '1 minute ago');
	});

	it('should be 2 minutes', function () {
		check("T12:00:50", "T12:02:12", 'in 2 minutes');
		check("T12:00:01", "T12:02:30", 'in 2 minutes');
		check("T12:00:01", "T12:02:00", 'in 2 minutes');
		check("T12:02:00", "T12:00:01", '2 minutes ago');
		check("T12:01:40", "T12:00:01", '2 minutes ago');
	});

	it('should be this hour', function () {
		check("T12:02:00", "T12:45:01", 'this hour');
		check("T12:54:40", "T12:10:01", 'this hour');
	});

	it('should be 2 hours', function () {
		check("T12:02:00", "T14:05:01", 'in 2 hours');
		check("T13:54:40", "T12:10:01", '2 hours ago');
	});

	it('should be today', function () {
		check("T02:00:00", "T23:00:00", 'today');
		check("T22:00:00", "T09:00:00", 'today');
	});

	it('should be yesterday', function () {
		check("2020-04-04T02:00:00", "2020-04-03T12:00:00", 'yesterday');
		check("2020-04-04T12:00:00", "2020-04-03T01:00:00", 'yesterday');
	});

	it('should be tomorrow', function () {
		check("2020-04-03T12:00:00", "2020-04-04T02:00:00", 'tomorrow');
		check("2020-04-03T01:00:00", "2020-04-04T12:00:00", 'tomorrow');
	});

	it('should be 2 days', function () {
		check("2020-04-04T23:00:00", "2020-04-03T01:00:00", '2 days ago');
		check("2020-04-04T00:00:00", "2020-04-02T00:00:00", '2 days ago');
		check("2020-04-03T01:00:00", "2020-04-04T23:00:00", 'in 2 days');
		check("2020-04-02T00:00:00", "2020-04-04T00:00:00", 'in 2 days');
	});

	it('should be last week', function () {
		check("2020-04-14", "2020-04-08", 'last week');
	});

	it('should be next week', function () {
		check("2021-07-08", "2021-07-13", 'next week');
	});

	it('should be this week', function () {
		check("2021-07-17", "2021-07-12", 'this week');
		check("2021-07-13", "2021-07-18", 'this week');
	});

	it('should be 2 weeks', function () {
		check("2021-07-17", "2021-07-28", 'in 2 weeks');
		check("2021-07-17", "2021-07-05", '2 weeks ago');
	});

	it('should be this month', function () {
		check("2020-04-04", "2020-04-29", 'this month');
		check("2020-04-29", "2020-04-04", 'this month');
	});

	it('should be last month', function () {
		check("2020-05-01", "2020-04-04", 'last month');
		check("2020-05-01", "2020-04-05", 'last month');
	});

	it('should be next month', function () {
		check("2020-04-04", "2020-05-01", 'next month');
		check("2020-04-05", "2020-05-01", 'next month');
	});

	it('should two months', function () {
		check("2020-04-04", "2020-05-22", 'in 2 months');
		check("2020-05-05", "2020-03-01", '2 months ago');
	});

	it('should be this year', function () {
		check("2020-04-04", "2020-10-25", 'this year');
		check("2020-09-25", "2020-02-04", 'this year');
	});

	it('should be last year', function () {
		check("2020-06-15", "2019-12-25", 'last year');
	});

	it('should be next year', function () {
		check("2019-12-25", "2020-06-15", 'next year');
	});
});
