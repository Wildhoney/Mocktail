<img src="media/Mocktail.png" width="300" alt="Mocktail" />

Mock all of your ES6 module components with Mocktail using dependency injection.

![Travis](http://img.shields.io/travis/Wildhoney/Mocktail.js.svg?style=flat-square)
&nbsp;
![npm](http://img.shields.io/npm/v/mocktail.svg?style=flat-square)
&nbsp;
![License MIT](http://img.shields.io/badge/License-MIT-lightgrey.svg?style=flat-square)

* **npm:** `npm i mocktail -D`

![Screenshot](media/Screenshot.png)

---

## Getting Started
```

Whenever you export a module, pass it through `mocktail.resolve` passing in both the actual object and its associated mock object:

```javascript
import {resolve} from 'mocktail';

class Request {}
class RequestMock {}

export default resolve(Request, RequestMock);
```

With the `resolve` method, the second argument is **always** the mocked object that will be returned when `environment` is defined as `true` using:

```javascript
import {env, ENV} from 'mocktail';
env(ENV.TESTING);
// ...
```

In the above example the default value for `environment` is `ENV.PRODUCTION` and can be set explicitly by: `env(ENV.PRODUCTION)`.

### Export As

Often you may want to export your modules without exporting as the default &ndash; in these instances you can use the `export as` syntax:

```javascript
import {resolve} from 'mocktail';

class Request {}
class RequestMock {}

const Module = resolve(Request, RequestMock);
export {Module as Request};
```

Then when you import the module elsewhere, you simply refer to the import as `Request`, which could either by the true `Request` object, or its mock &ndash; `RequestMock`:

```javascript
import {Request} from './request.js';
// ...
```

### Philosophy

As all of the import paths are relative in ECMAScript 6, it's not possible to mock objects based on the environment &ndash; this makes it cumbersome in any approach to mocking objects. In all likeliness you'll resort to adding dependency injection capabilities to the object you wish to mock directly &ndash; perhaps with an [`init` method](http://davidvujic.blogspot.co.uk/2015/02/is-the-es6-import-feature-an-anti-pattern.html). However, we believe that an object shouldn't be aware of its mocked counterpart &ndash; taking this approach we simply bake the mocked object into the same file as the actual object, which keeps them together, yet we still have a clear separation of concerns between our two objects.
