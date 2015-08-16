import {mock}             from '../../../component/mocktail';
import Authentication     from '../modules/Authentication';
import AuthenticationMock from '../modules/AuthenticationMock';

const Component = mock(Authentication, AuthenticationMock);
export {Component as Authentication};
