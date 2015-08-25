import {env, ENV, inject} from 'mocktail';
env(ENV.TESTING);
inject('Request', class RequestMock {});
