import axios from 'axios';

const BASE = 'https://www.theaudiodb.com/api/v1/json/123/';

export const searchArtist = async (artist: string) => {
  const url = `${BASE}/search.php?s=${encodeURIComponent(artist)}`;
  const res = await axios.get(url);
  return res.data;
};

export const getTracksByArtist = async (artist: string) => {
  // first get artist to find id
  const r = await axios.get(`${BASE}/search.php?s=${encodeURIComponent(artist)}`);
  const artistObj = r.data?.artists?.[0];
  if (!artistObj) return [];
  const artistId = artistObj.idArtist;
  const tracksRes = await axios.get(`${BASE}/track.php?m=${artistId}`);
  return tracksRes.data?.track ?? [];
};

export const searchTrackByName = async (trackName: string) => {
  const url = `${BASE}/searchtrack.php?s=&t=${encodeURIComponent(trackName)}`;
  const res = await axios.get(url);
  return res.data?.track ?? [];
};

// helper to normalize TheAudioDB track to our Track type
export const normalizeTrack = (t: any) => ({
  id: t.idTrack ?? t.id ?? t.trackId ?? (t.strTrack ? t.strTrack + '::' + (t.idArtist ?? '') : Math.random().toString(36)),
  nome: t.strTrack ?? t.strTrack ?? 'Unknown',
  artista: t.strArtist,
  genero: t.strGenre,
  ano: t.intYearReleased,
  raw: t
});