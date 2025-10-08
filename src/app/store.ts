import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import playlistsReducer from '../features/playlists/playlistsSlice';
import musicsReducer from '../features/musics/musicsSlice';
import { loadState, saveState } from './localStorageSync';

const persisted = loadState() || {};

const store = configureStore({
  reducer: {
    auth: authReducer,
    playlists: playlistsReducer,
    musics: musicsReducer
  },
  preloadedState: persisted
});

store.subscribe(() => {
  const state = store.getState();
  saveState({
    playlists: state.playlists,
    auth: { user: state.auth.user }
  });
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;