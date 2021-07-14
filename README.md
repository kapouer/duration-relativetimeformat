# Duration - RelativeTimeFormat

A simple browser / node module that leverages Intl.RelativeTimeFormat to
print out localized relative durations:

```js
const Duration = require('duration-relativetimeformat');
const duree = new Duration('fr');

console.log(duree.format(Date.now() - 10 * Duration.minute));
> il y a 10 minutes
```

## constructor(lang, { numeric, style, localeMatcher })

Only lang is required.

## format(to, from = now())

where to and from are either dates, timestamps, or strings.

## examples of results

Non-numeric dates depend on the current date:

- this minute, this hour
- yesterday, today, tomorrow
- last week, next week
- last month, next month
- last year, next year

Otherwise numeric dates are rounded as much as possible, to avoid things like

- 5 seconds (prefer now)
- 35 seconds (prefer this minute or in 1 minute)
- 28 hours (prefer 1 day)
- 400 minutes (prefer 4 hours)

etc...
