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
	constructor(lang, opts = {}) {
		const { precision = 0.2 } = opts;
		this.precision = precision;
		const rOpts = Object.assign({
			numeric: 'auto',
			localeMatcher: 'best fit',
			style: 'long'
		}, opts);
		delete rOpts.precision;

		this.rtf = new Intl.RelativeTimeFormat(lang, rOpts);
	}

	lookup(delta, percent) {
		const big = { abs: 0, round: 0 };
		const small = { abs: 0, round: 0 };
		let sum = 0;
		for (const [unit, val] of Intervals) {
			const rest = delta - sum;
			const round = Math.floor(rest / val);
			const abs = round * val;
			sum += abs;
			if (!big.unit) {
				if (round > 0) {
					big.unit = unit;
					big.round = round;
					big.abs = abs;
				}
			} else {
				small.unit = unit;
				small.round = round;
				small.abs = abs;
				break;
			}
		}
		// FIXME 0 hour -> "this hour"
		// 0 minute -> "this minute"
		// so if we fall under percent and big.round is 0,
		// we actually get "this bigUnit"
		if (!big.unit) big.unit = 'minute';
		if (!small.unit) small.unit = 'second';
		if (small.abs <= percent * big.abs) {
			return [big.round, big.unit];
		} else {
			return [big.round * this.constructor[big.unit] / this.constructor[small.unit], small.unit];
		}
	}

	format(to, from = new Date()) {
		if (!(to instanceof Date)) {
			to = new Date(to);
		}
		const delta = to - from;
		const sign = Math.sign(delta);
		const [val, unit] = this.lookup(Math.abs(delta), this.precision);
		return this.rtf.format(sign * val, unit);
	}
}

Intervals.forEach(([unit, val]) => Duration[unit] = val);

module.exports = Duration;

