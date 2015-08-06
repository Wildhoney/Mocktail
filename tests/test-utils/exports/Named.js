import {resolve}          from '../../../component/mocktail';
import Authentication     from '../modules/Authentication';
import AuthenticationMock from '../modules/AuthenticationMock';

const Component = resolve(Authentication, AuthenticationMock);
export {Component as Authentication};
