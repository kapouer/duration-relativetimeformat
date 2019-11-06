# Duration - RelativeTimeFormat

A simple browser / node module that leverages Intl.RelativeTimeFormat to
print out localized relative durations:

```
const duration = require('duration-relativetimeformat')('fr', {
	numeric: 'auto', // those are the default options
	localeMatcher: 'best fit',
	style: 'long'
});
console.log(duration(new Date(Date.now() - 600000)));
> il y a 10 minutes
console.log(duration(new Date(Date.now() - 2 * 60 * 1000)), new Date(Date.now() - 24 * 60 * 60 * 1000));
```

