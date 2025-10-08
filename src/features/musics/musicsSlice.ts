import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api/theAudioDB';
import { Track } from '../../types';

export const fetchTracksByArtist = createAsyncThunk('musics/fetchByArtist', async (artist: string) => {
  const res = await api.getTracksByArtist(artist);
  return res;
});

const musicsSlice = createSlice({
  name: 'musics',
  initialState: { list: [] as any[], status: 'idle', error: null as string | null },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchTracksByArtist.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchTracksByArtist.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchTracksByArtist.rejected, (state, action) => { state.status = 'failed'; state.error = action.error.message ?? null; });
  }
});

export default musicsSlice.reducer;