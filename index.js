const millisecond = 1;
const second = millisecond * 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;
const week = day * 7;
const month = day * 30;
const year = day * 365;

const Intervals = [
	['year', year],
	['month', month],
	['week', week],
	['day', day],
	['hour', hour],
	['minute', minute],
	['second', second],
	['millisecond', millisecond]
];
class Duration {
	constructor(lang, {
		numeric = "auto",
		localeMatcher = "best fit",
		style = "long"
	} = {}) {
		this.rtf = new Intl.RelativeTimeFormat(lang, {
			numeric, localeMatcher, style
		});
	}

	lookup(from, to) {
		const delta = Math.abs(to - from);
		const sign = Math.sign(to - from);

		const years = Math.round(delta / Duration.year);
		if (years > 1) return [sign * years, 'year'];

		const year = Math.abs(to.getFullYear() - from.getFullYear());
		const months = Math.round(delta / Duration.month);
		if (months > 4) return [sign * year, 'year'];
		if (months > 1) return [sign * months, 'month'];

		const month = Math.abs(to.getMonth() - from.getMonth());
		const weeks = Math.round(delta / Duration.week);
		if (weeks > 3) return [sign * month, 'month'];
		if (weeks > 1) return [sign * weeks, 'week'];

		const weekDist = (to.getDay() || 7) - (from.getDay() || 7);
		const week = Math.abs(weekDist) > 4 ? 0 : 1;
		const days = Math.round(delta / Duration.day);
		if (days > 4) return [sign * week, 'week'];
		if (days > 1) return [sign * days, 'day'];

		const day = Math.abs(to.getDate() - from.getDate());
		const hours = Math.round(delta / Duration.hour);
		if (hours > 12) return [sign * day, 'day'];
		if (hours > 1) return [sign * hours, 'hour'];

		const hour = Math.abs(to.getHours() - from.getHours());
		const minutes = Math.round(delta / Duration.minute);
		if (minutes > 40) return [sign * hour, 'hour'];

		const minute = Math.abs(to.getMinutes() - from.getMinutes());
		const seconds = Math.round(delta / Duration.second);
		if (minutes > 1) return [sign * minutes, 'minute'];
		if (seconds > 20) return [sign * minute, 'minute'];

		return [0, 'second'];
	}

	format(to, from = new Date()) {
		if (!(to instanceof Date)) {
			to = new Date(to);
		}
		if (!(from instanceof Date)) {
			from = new Date(from);
		}

		const [val, unit] = this.lookup(from, to);
		return this.rtf.format(val, unit);
	}
}

Intervals.forEach(([unit, val]) => Duration[unit] = val);

module.exports = Duration;

