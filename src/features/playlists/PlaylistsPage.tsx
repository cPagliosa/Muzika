import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import { addPlaylist, removePlaylist, updatePlaylist } from './playlistsSlice';
import { useNavigate } from 'react-router-dom';

export default function PlaylistsPage() {
  const playlists = useSelector((s: RootState) => s.playlists.items);
  const user = useSelector((s: RootState) => s.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState('');

  const handleAdd = () => {
    if (!name.trim() || !user) return;
    dispatch(addPlaylist({ nome: name, usuarioId: user.id }));
    setName('');
  };

  const handleDelete = (id: string) => {
    if (!confirm('Excluir playlist?')) return;
    dispatch(removePlaylist(id));
  };

  return (
    <div>
      <h2>Minhas Playlists</h2>
      <div>
        <input placeholder="Nome da playlist" value={name} onChange={e => setName(e.target.value)} />
        <button onClick={handleAdd}>Criar</button>
      </div>

      <ul>
        {playlists.filter(p => p.usuarioId === user?.id).map(p => (
          <li key={p.id} className="card">
            <strong>{p.nome}</strong> ({p.musicas.length} músicas)
            <div style={{ marginTop: 6 }}>
              <button onClick={() => navigate(`/playlists/${p.id}`)}>Abrir</button>
              <button onClick={() => {
                const novoNome = prompt('Novo nome', p.nome);
                if (novoNome) dispatch(updatePlaylist({ ...p, nome: novoNome }));
              }}>Editar</button>
              <button onClick={() => handleDelete(p.id)}>Excluir</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}