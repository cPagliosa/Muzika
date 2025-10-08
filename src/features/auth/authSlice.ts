import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types';
import { AppDispatch } from '../../app/store';

const STATIC_USERS = [
  { id: 'u1', email: 'caio.pagliosa@gmail.com', password: '123456', name: 'Caio pagliosa' },
  { id: 'u2', email: 'adm@gmail.com', password: '123456', name: 'Admin' }
];

interface AuthState {
  user: User | null;
  error?: string | null;
}

const initialState: AuthState = {
  user: null,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.error = null;
    },
    loginFail(state, action: PayloadAction<string>) {
      state.user = null;
      state.error = action.payload;
    },
    logout(state) {
      state.user = null;
      state.error = null;
    }
  }
});

export const { loginSuccess, loginFail, logout } = authSlice.actions;

export const login = (payload: { email: string; password: string }) => (dispatch: AppDispatch) => {
  const found = STATIC_USERS.find(u => u.email === payload.email && u.password === payload.password);
  if (found) {
    const user = { id: found.id, email: found.email, name: found.name };
    sessionStorage.setItem('session_user', JSON.stringify({ id: user.id, email: user.email, name: user.name, lastLogin: new Date().toISOString() }));
    dispatch(loginSuccess(user));
  } else {
    dispatch(loginFail('Email ou senha incorretos.'));
  }
};

export const doLogout = () => (dispatch: AppDispatch) => {
  sessionStorage.removeItem('session_user');
  dispatch(logout());
};

export default authSlice.reducer;