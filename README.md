![100% test coverage](https://img.shields.io/badge/coverage-100%25-brightgreen.svg)

# auto-id
> Automatically creates a collection of element references keyed from the ID attribute of all page elements

Comes in handy when writing Electron apps, OS X Cocoa apps with webviews, websites... basically anything that uses HTML / JS / CSS as the view.
The module queries all DOM elements with an id attribute and stores reference to that element in a collection keyed off the camel-cased id value.

For example, assuming the markup below:

```html
...
<body>
  <div id="container">
    <div id="main-title"></div>
  </div>
</body>
...
```

`auto-id` allows us to access all elements with an `id` attribute without writing queries (or querying the DOM):

```js
var dom = require('auto-id');

// IMPORTANT: If using a shared instance (the default behavior illustrated above),
// we probably need to "refresh" our instance since it was likely instantiated before
// our DOM was drawn...
dom.refresh();

// Now we have reference to the elements with ID attributes:
dom.container.style.color = '#333';

// Note a kebab-cased ID becomes camelCased
dom.mainTitle.textContent = 'New text here';

// We add an element to the DOM 
document.body.appendChild(someElement);

// We need to refresh our instance before we will have a
// reference to it - this is where shared instances provide 
// additional value in terms of use and performance
dom.refresh();

// Use the reference liberally without performance concerns
dom.someElementsId.visibility = 'visible';
```


## Installation
Install via npm:

```sh
$ npm i auto-id --save
```


## Usage
By default, this module exports a shared instance.
The constructor can be accessed via the export's `AutoId` property (see below).
To access the shared instance (probably what you want):

```javascript
var dom = require('auto-id');

dom.someId.style.transform = 'scale(2)';
```


Access the constructor:

```javascript
var AutoId = require('auto-id').AutoId;
var dom = new AutoId();

dom.someId.style.transform = 'scale(2)';
```

## Tests
Tests are written in [`tape`](https://github.com/substack/tape).

```sh
$ npm test
```

## Coverage
Test coverage is provided via [`Istanbul`](https://github.com/gotwarlost/istanbul).

```sh
$ npm run coverage
```
