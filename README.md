# cookie.js

[![Build Status](https://travis-ci.org/sasaplus1/cookie.js.png)](https://travis-ci.org/sasaplus1/cookie.js)
[![Dependency Status](https://gemnasium.com/sasaplus1/cookie.js.png)](https://gemnasium.com/sasaplus1/cookie.js)

library for Cookie

## Installation

```sh
$ bower install cookie.js
```

## Usage

```html
<script src="cookie.min.js"></script>
```

```js
// was set value to Cookie:
// "name1=value1; name2=value2; name3=value3; iroha=%E3%81%84%E3%82%8D%E3%81%AF";

cookie.get('name1');
// => "value1"

cookie.get();
// => {
//   name1: "value1",
//   name2: "value2",
//   name3: "value3",
//   iroha: "いろは"
// }

// set cookie-pair
cookie.set('sushi', '寿司');
// append "sushi=%E5%AF%BF%E5%8F%B8" to Cookie

// set cookie-pair and attributes
cookie.set('name4', 'value4', {
  expires: 'Wed, 25 Dec 2013 15:24:47 GMT',
  maxage: 60,
  domain: 'github.com',
  path: '/',
  secure: true
});

// multiple set
cookie.set([
  {name: 'name5', value: 'value5', secure: true},
  {name: 'name6', value: 'value6', path: '/'}
]);

// set with method chain
cookie
  .set('name7', 'value7')
  .set('name8', 'value8');
```

## Functions

### get([name])

- `name` String|undefined - cookie-name
- `return` String|null|Object - cookie-value or cookie-pairs

get cookie-value of cookie-name. cookie-value is decode with decodeURIComponent.

return cookie-pairs object if name is undefined.
return null if cookie-name is not found.

### set(name[, value, options])

- `name` String|Object[] - cookie-name
- `value` String|undefined - cookie-value
- `options` Object|undefined - attributes object
- `return` Object - own instance

set cookie-pair to Cookie. cookie-value is encode with encodeURIComponent.

can multiple set if name is an Array of Object.

can set to options below:

- expires
- maxage
- domain
- path
- secure

## Test

```sh
$ npm install
$ npm test
```

## License

The MIT license. Please see LICENSE file.
