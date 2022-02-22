// Type definitions for duration-relativetimeformat 2.0
// Project: https://github.com/kapouer/duration-relativetimeformat

declare class Duration {
	constructor(
		lang: Intl.BCP47LanguageTag,
		options?: Intl.RelativeTimeFormatOptions = {
			numeric = "auto",
			localeMatcher = "best fit",
			style = "long"
		}
	);

	format(d1: string | number | Date, d2?: string | number | Date = new Date()): string;
}

export = Duration;

export as namespace Duration;
