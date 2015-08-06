<img src="media/Mocktail.png" width="300" alt="Mocktail" />

Mock all of your ES6 module components with Mocktail using dependency injection.

![Travis](http://img.shields.io/travis/Wildhoney/Mocktail.svg?style=flat-square)
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

With Mocktail it's important to note that the `import` syntax is **exactly** the same whether you're importing the actual object or its mocked counterpart.

### Named Export

Often you may want to export your modules without exporting as the `default` &ndash; in these instances you can use the `export as` syntax:

```javascript
import {resolve} from 'mocktail';

class Request {}
class RequestMock {}

const Module = resolve(Request, RequestMock);
export {Module as Request};
```

Then when you import the module elsewhere, you simply refer to the import as `Request`, which could either be the true `Request` object, or its mock &ndash; `RequestMock`:

```javascript
import {Request} from './Request';

// ...
```

## Configuration

Setting up Mocktail is straightforward &ndash; with the easiest way being to have a bootstrap file that is loaded before your unit tests are run.

> Bootstrap.js:
```javascript
import {env, ENV} from 'mocktail';
env(ENV.TESTING);
```

You then need to ensure that your bootstrap file is loaded prior to the loading of your components:

```javascript
import _       from './Bootstrap';
import Request from '../components/Request';

describe('Request', () => {

    // ...

});
```

Any time the `Request` component is imported, it will be the mocked counterpart as opposed to the actual object &ndash; which in the case of `Request` objects would simply mimic an AJAX call using a delay.

You can take a look in the [`example` directory](https://github.com/Wildhoney/Mocktail/blob/master/example) for the recommended setup for Mocktail.

![Screenshot](media/ScreenshotExtended.png)

## Dependency Injection

Another feature of Mocktail is the ability to inject an entirely custom module at runtime. Currently this feature only supports **named** functions and classes, and their names must be unique to your project otherwise you may be mocking a function with a shared name.

In your bootstrap you simply need to specify the name of the function you want to mock:

> Bootstrap.js
```javascript
import {env, inject, ENV} from 'mocktail';
env(ENV.TESTING);
class RequestMock {};
inject('Request', RequestMock);
```

And then within your `Request` module you would simply need to pass it through the `resolve` method with an *optional* second argument for the mocked function which will be used as a default:

```javascript
import {resolve} from 'mocktail';
class Request {};
export default resolve(Request);
```

Then whenever you reference `Request` in your unit tests, you'll receive `RequestMock` instead as long as you've set the `env` as `ENV.TESTING`.

## Contribute

[Pull requests](https://github.com/Wildhoney/Mocktail/pulls) are **highly** encouraged if you find any bugs, or wish to improve the codebase with wonderful ideas. However, if you're a little shy, please feel free to [open an issue](https://github.com/Wildhoney/Mocktail/issues) &ndash; that is fine, too.

Tests are written in Karma and can be run with `npm run test` after you have installed all dependencies with `npm i`.
