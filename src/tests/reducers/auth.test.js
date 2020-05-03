import authReducer from '../../reducers/auth';

test('Should test login scenario', () => {
  const uid = '1234';
  const action = { type: 'LOGIN', uid };
  const state = authReducer({}, action);

  expect(state.uid).toBe(uid);
});

test('Should test logout scenario', () => {
  const action = { type: 'LOGOUT' };
  const state = authReducer({}, action);

  expect(state.uid).toBeFalsy();
});