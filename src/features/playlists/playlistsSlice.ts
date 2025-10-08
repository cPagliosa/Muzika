import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Playlist, Track } from '../../types';
import { v4 as uuidv4 } from 'uuid';

interface PlaylistsState {
  items: Playlist[];
}

const initialState: PlaylistsState = {
  items: []
};

const playlistsSlice = createSlice({
  name: 'playlists',
  initialState,
  reducers: {
    setPlaylists(state, action: PayloadAction<Playlist[]>) {
      state.items = action.payload;
    },
    addPlaylist(state, action: PayloadAction<{ nome: string; usuarioId: string }>) {
      const p: Playlist = { id: uuidv4(), nome: action.payload.nome, usuarioId: action.payload.usuarioId, musicas: [] };
      state.items.push(p);
    },
    updatePlaylist(state, action: PayloadAction<Playlist>) {
      const idx = state.items.findIndex(p => p.id === action.payload.id);
      if (idx >= 0) state.items[idx] = action.payload;
    },
    removePlaylist(state, action: PayloadAction<string>) {
      state.items = state.items.filter(p => p.id !== action.payload);
    },
    addMusicToPlaylist(state, action: PayloadAction<{ playlistId: string; music: Track }>) {
      const p = state.items.find(pl => pl.id === action.payload.playlistId);
      if (p) p.musicas.push(action.payload.music);
    },
    removeMusicFromPlaylist(state, action: PayloadAction<{ playlistId: string; musicId: string }>) {
      const p = state.items.find(pl => pl.id === action.payload.playlistId);
      if (p) p.musicas = p.musicas.filter(m => m.id !== action.payload.musicId);
    }
  }
});

export const { setPlaylists, addPlaylist, updatePlaylist, removePlaylist, addMusicToPlaylist, removeMusicFromPlaylist } = playlistsSlice.actions;
export default playlistsSlice.reducer;