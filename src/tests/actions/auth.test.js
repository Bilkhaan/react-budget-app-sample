import { login, onLogout } from '../../actions/auth';

test('Should test login scenario', () => {
  const uid = "1234";
  const action = login(uid);
  expect(action).toEqual({
    type: 'LOGIN',
    uid
  });
});

test('Should test logout scenarios', () => {
  const action = onLogout();
  expect(action).toEqual({
    type: 'LOGOUT'
  });
});