import { describe, expect, it } from '@jest/globals';
import authSliceReducer, {
  initialState,
  registerUser,
  loginUser,
  logoutUser,
  fetchUser,
  updateUser,
  setAuthenticationStatus
} from './authSlice';

test('Должен обработать setAuthenticationStatus', () => {
  const action = setAuthenticationStatus(true);
  const state = authSliceReducer(initialState, action);

  expect(state.isAuthenticated).toBe(true);
});

test('Должен обработать registerUser.pending', () => {
  const action = { type: registerUser.pending.type };
  const state = authSliceReducer(initialState, action);

  expect(state.isLoading).toBe(true);
  expect(state.error).toBeNull();
});

test('Должен обработать registerUser.fulfilled', () => {
  const payload = { user: { email: 'test@mail.ru', name: 'Test' } };
  const action = { type: registerUser.fulfilled.type, payload };
  const state = authSliceReducer(initialState, action);

  expect(state.user).toEqual(payload.user);
  expect(state.isAuthenticated).toBe(true);
  expect(state.isLoading).toBe(false);
});

test('Должен обработать registerUser.rejected', () => {
  const errorMessage = 'Registration failed';
  const action = {
    type: registerUser.rejected.type,
    error: { message: errorMessage }
  };
  const state = authSliceReducer(initialState, action);

  expect(state.isLoading).toBe(false);
  expect(state.error).toBe(errorMessage);
});

test('Должен обработать loginUser.pending', () => {
  const action = { type: loginUser.pending.type };
  const state = authSliceReducer(initialState, action);
  expect(state.isLoading).toBe(true);
  expect(state.error).toBeNull();
});

test('Должен обработать loginUser.fulfilled', () => {
  const payload = { user: { email: 'test@mail.ru', name: 'Test' } };
  const action = { type: loginUser.fulfilled.type, payload };
  const state = authSliceReducer(initialState, action);

  expect(state.user).toEqual(payload.user);
  expect(state.isAuthenticated).toBe(true);
  expect(state.isLoading).toBe(false);
});

test('Должен обработать loginUser.rejected', () => {
  const errorMessage = 'Login failed';
  const action = {
    type: loginUser.rejected.type,
    error: { message: errorMessage }
  };
  const state = authSliceReducer(initialState, action);

  expect(state.isLoading).toBe(false);
  expect(state.error).toBe(errorMessage);
});

describe('logoutUser', () => {
  const loggedInState = {
    ...initialState,
    user: { email: 'user@mail.ru', name: 'User' },
    isAuthenticated: true
  };

  it('Должен обработать logoutUser.pending', () => {
    const action = { type: logoutUser.pending.type };
    const state = authSliceReducer(loggedInState, action);

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('Должен обработать logoutUser.fulfilled', () => {
    const action = { type: logoutUser.fulfilled.type };
    const state = authSliceReducer(loggedInState, action);

    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
    expect(state.isLoading).toBe(false);
  });

  it('Должен обработать logoutUser.rejected', () => {
    const errorMessage = 'Logout failed';
    const action = {
      type: logoutUser.rejected.type,
      error: { message: errorMessage }
    };
    const state = authSliceReducer(loggedInState, action);

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });
});

test('Должен обработать fetchUser.pending', () => {
  const action = { type: fetchUser.pending.type };
  const state = authSliceReducer(initialState, action);

  expect(state.isLoading).toBe(true);
  expect(state.error).toBeNull();
});

test('Должен обработать fetchUser.fulfilled', () => {
  const payload = { user: { email: 'test@mail.ru', name: 'Test' } };
  const action = { type: fetchUser.fulfilled.type, payload };
  const state = authSliceReducer(initialState, action);

  expect(state.user).toEqual(payload.user);
  expect(state.isAuthenticated).toBe(true);
  expect(state.isLoading).toBe(false);
});

test('Должен обработать fetchUser.rejected', () => {
  const errorMessage = 'Fetch user failed';
  const action = {
    type: fetchUser.rejected.type,
    error: { message: errorMessage }
  };
  const state = authSliceReducer(initialState, action);

  expect(state.isLoading).toBe(false);
  expect(state.isAuthenticated).toBe(true);
  expect(state.error).toBe(errorMessage);
});

describe('updateUser', () => {
  const existingUserState = {
    ...initialState,
    user: { email: 'old@mail.ru', name: 'Old' },
    isAuthenticated: true
  };

  it('Должен обработать updateUser.pending', () => {
    const action = { type: updateUser.pending.type };
    const state = authSliceReducer(existingUserState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('Должен обработать updateUser.fulfilled', () => {
    const payload = { user: { email: 'new@mail.ru', name: 'New' } };

    const action = { type: updateUser.fulfilled.type, payload };
    const state = authSliceReducer(existingUserState, action);

    expect(state.user).toEqual(payload.user);
    expect(state.isLoading).toBe(false);
  });

  it('Должен обработать updateUser.rejected', () => {
    const errorMessage = 'Update user failed';
    const action = {
      type: updateUser.rejected.type,
      error: { message: errorMessage }
    };

    const state = authSliceReducer(existingUserState, action);

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });
});
