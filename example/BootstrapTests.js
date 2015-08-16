import {env, ENV, inject} from 'mocktail';
env(ENV.TESTING);
inject('Example', class ExampleMock {});
