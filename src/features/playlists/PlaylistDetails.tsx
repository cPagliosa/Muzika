import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import { removeMusicFromPlaylist } from "./playlistsSlice";

export default function PlaylistDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const playlist = useSelector((state: RootState) =>
    state.playlists.items.find((p) => p.id === id)
  );

  const user = useSelector((state: RootState) => state.auth.user);

  if (!playlist) return <div>Playlist não encontrada.</div>;
  if (playlist.usuarioId !== user?.id)
    return <div>Acesso negado — esta playlist pertence a outro usuário.</div>;

  const handleRemove = (musicId: string) => {
    if (!confirm("Remover música desta playlist?")) return;
    dispatch(removeMusicFromPlaylist({ playlistId: id!, musicId }));

    // Atualiza LocalStorage também
    const playlistsLS = JSON.parse(localStorage.getItem("playlists") || "[]");
    const updated = playlistsLS.map((pl: any) =>
      pl.id === id
        ? { ...pl, musicas: pl.musicas.filter((m: any) => m.idTrack !== musicId) }
        : pl
    );
    localStorage.setItem("playlists", JSON.stringify(updated));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">{playlist.nome}</h2>

      {playlist.musicas.length === 0 ? (
        <p className="text-gray-500">
          Nenhuma música nesta playlist ainda. Use a tela de busca para adicionar.
        </p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {playlist.musicas.map((m) => (
            <li
              key={m.idTrack}
              className="bg-white shadow-md rounded-lg p-4 text-center hover:shadow-lg transition"
            >
              <h4 className="font-semibold">{m.strTrack}</h4>
              <p className="text-gray-500">{m.strArtist}</p>
              <button
                onClick={() => handleRemove(m.idTrack)}
                className="mt-3 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Remover
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
