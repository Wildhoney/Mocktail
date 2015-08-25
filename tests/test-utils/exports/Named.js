import {stub}             from '../../../component/mocktail';
import Authentication     from '../modules/Authentication';
import AuthenticationMock from '../modules/AuthenticationMock';

const Component = stub(Authentication, AuthenticationMock);
export {Component as Authentication};
