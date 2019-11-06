const second = Duration.second = 1000;
const minute = Duration.minute = 60 * second;
const hour = Duration.hour = minute * 60;
const day = Duration.day = hour * 24;
const week = Duration.week = day * 7;
const month = Duration.month = day * 30;
const year = Duration.year = day * 365;

module.exports = Duration;


function Duration(lang, opts={}) {
	var rtf = new Intl.RelativeTimeFormat(lang, Object.assign({
		numeric: 'auto',
		localeMatcher: 'best fit',
		style: 'long'
	}, opts));

	return function formatDuration(to, from = new Date()) {
		if (!(to instanceof Date)) {
			to = new Date(to);
		}
		let delta = Math.abs(from - to);
		let unit;

		switch (false) {
			case !(delta < minute / 2):
				unit = 'second';
				delta = 0;
				break;
			case !(delta < minute):
				unit = 'second';
				break;
			case !(delta < 2 * minute):
				unit = 'minute';
				delta = 1;
				break;
			case !(delta < hour):
				unit = 'minute';
				delta = Math.floor(delta / minute);
				break;
			case !(delta < day):
				unit = 'hour';
				delta = Math.floor(delta / hour);
				break;
			case !(delta < week):
				unit = 'day';
				delta = Math.floor(delta / day);
				break;
			case !(delta < month):
				unit = 'week';
				delta = Math.floor(delta / week);
				break;
			case !(delta < year):
				unit = 'month';
				delta = Math.floor(delta / month);
				break;
			default:
				unit = 'year';
				delta = Math.floor(delta / year);
		}
		return rtf.format(Math.sign(to - from) * delta, unit);
	}
};
