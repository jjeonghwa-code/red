import test from 'ava';
import App from '../';
import account from './account/index-test';
import app from './app/index-test';

test('api test', t => t.pass());
account(App, '/api/account');
app(App, '/api/app');
