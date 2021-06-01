# Duration - RelativeTimeFormat

A simple browser / node module that leverages Intl.RelativeTimeFormat to
print out localized relative durations:

```js
const Duration = require('duration-relativetimeformat');
const duree = new Duration('fr', {
 numeric: 'auto', // those are the default options
 localeMatcher: 'best fit',
 style: 'long',
 precision: 0.2 // used by duration only
});

console.log(duree.format(new Date(Date.now() - 600000)));
> il y a 10 minutes
console.log(duree.format(new Date(Date.now() - 2 * 60 * 1000)), new Date(Date.now() - 24 * 60 * 60 * 1000));
```
