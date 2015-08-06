# Mocktail.js
Mock all of your ES6 module components with Mocktail using dependency injection.

## Getting Started

> mocktail.js:
```javascript
import Mocktail from 'mocktail';
export default new Mocktail();
```

Whenever you export a module, pass it through `mocktail.resolve`:

```javascript
import {resolve} from './mocktail.js';

class Authentication {}
class AuthenticationMock {}

export default resolve(Authentication, AuthenticationMock);
```

With the `resolve` method, the second argument is **always** the mocked object that will be returned when `environment` is defined as `true` using:

```javascript
import {env, TESTING} from './mocktail.js';
env(TESTING);
// ...
```

In the above example the default value for `environment` is `mocktail.PRODUCTION` and can be set explicitly as: `env(PRODUCTION)`.

### Export As

Often you may want to export your modules without exporting as the default &ndash; in these instances you can use the `export as` syntax:

```javascript
import {resolve} from './mocktail.js';

class Authentication {}
class AuthenticationMock {}

const Module = resolve(Authentication, AuthenticationMock);
export {Module as Authentication};
```

Then when you import the module elsewhere, you simply refer to the import as `Authentication`:

```javascript
import {Authentication} from './authentication.js';
// ...
```