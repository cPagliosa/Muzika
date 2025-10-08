import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import LoginPage from './features/auth/LoginPage';
import PlaylistsPage from './features/playlists/PlaylistsPage';
import PlaylistDetails from './features/playlists/PlaylistDetails';
import MusicSearch from './features/musics/MusicSearch';
import PrivateRoute from './components/PrivateRoute';
import { useDispatch } from 'react-redux';
import { doLogout } from './features/auth/authSlice';

export default function App() {
  const dispatch = useDispatch();
  return (
    <>
      <nav>
        <Link to="/home">Home</Link>
        <Link to="/playlists">Playlists</Link>
        <Link to="/musicas">Músicas</Link>
        <div style={{ marginLeft: 'auto' }}>
          <button onClick={() => dispatch(doLogout())}>Sair</button>
        </div>
      </nav>
      <div className="container">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<PrivateRoute><div><h1>Home</h1><p>Bem-vindo!</p></div></PrivateRoute>} />
          <Route path="/playlists" element={<PrivateRoute><PlaylistsPage /></PrivateRoute>} />
          <Route path="/playlists/:id" element={<PrivateRoute><PlaylistDetails /></PrivateRoute>} />
          <Route path="/musicas" element={<PrivateRoute><MusicSearch /></PrivateRoute>} />
        </Routes>
      </div>
    </>
  );
}