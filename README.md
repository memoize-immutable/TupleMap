TupleMap [![npm version](https://badge.fury.io/js/tuplemap.svg)](https://badge.fury.io/js/tuplemap) [![Build Status](https://travis-ci.org/memoize-immutable/tuplemap.svg?branch=master)](https://travis-ci.org/memoize-immutable/tuplemap) [![Dependency Status](https://david-dm.org/memoize-immutable/tuplemap.svg)](https://david-dm.org/memoize-immutable/tuplemap) [![Coverage Status](https://coveralls.io/repos/github/memoize-immutable/tuplemap/badge.svg?branch=master)](https://coveralls.io/github/memoize-immutable/tuplemap?branch=master)
========

A Map which accepts multiple objects as a key.
This lib is one of the several possible cache for [memoize-immutable](/louisremi/memoize-immutable),
but it can suit other use-cases as it implements a usual Map API.

## Install

`npm install --save TupleMap`

This lib has no dependency, but requires a native implementation of Map.

## Usage

```js
var TupleMap = require('TupleMap');

// When the `limit` option is set, TupleMap turns into an LRU cache.
// Clearing the map every X seconds can also be an acceptable strategy sometimes.
var cache = new TupleMap({ limit: 10000 });

var keyPart1 = {};
var keyPart2 = 'yolo';
var keyPart3 = [];
var value = {any: 'thing'};

// Note that following keyPart tuples are wrapped in new arrays that are !==
// (otherwise a Map would have been enough).
cache.set([keyPart1, keyPart2, keyPart3], value);

cache.has([keyPart1, keyPart2, keyPart3]) === true;
cache.get([keyPart1, keyPart2, keyPart3]) === value;
```

## When should you use this map?

This map should be used with functions that take more than one argument.
It is a less efficient but more flexible alternative to WeakTupleMap.

## Author

[@louis_remi](https://twitter.com/louis_remi)

## License

MPL-2.0
