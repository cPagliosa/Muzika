export const PERSIST_KEY = 'playlists_app_ts_v1';

export const loadState = (): any | undefined => {
  try {
    const raw = localStorage.getItem(PERSIST_KEY);
    if (!raw) return undefined;
    return JSON.parse(raw);
  } catch (e) {
    console.error('loadState error', e);
    return undefined;
  }
};

export const saveState = (state: any) => {
  try {
    const s = JSON.stringify(state);
    localStorage.setItem(PERSIST_KEY, s);
  } catch (e) {
    console.error('saveState error', e);
  }
};