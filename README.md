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

In the above example the default value for `environment` is `ENV.PRODUCTION` and can be set explicitly with: `env(ENV.PRODUCTION)`.

### Export As

Often you may want to export your modules without exporting as the `default` &ndash; in these instances you can use the `export as` syntax:

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

With Mocktail it's important to note that the `import` syntax is **exactly** the same whether you're importing the actual object or its mocked counterpart.
