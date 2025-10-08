import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import { addMusicToPlaylist } from "../playlists/playlistsSlice";
import { Track } from "../../types";

const SearchPage: React.FC = () => {
  const dispatch = useDispatch();
  const playlists = useSelector((state: RootState) => state.playlists.items);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("artist");
  const [trending, setTrending] = useState<Track[]>([]);
  const [results, setResults] = useState<Track[]>([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState<string>("");

  // 🔥 Carrega 3 músicas em alta
  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await fetch(
          "https://www.theaudiodb.com/api/v1/json/123/trending.php?country=us&type=itunes&format=singles"
        );
        const data = await res.json();
        if (data?.trending) {
          setTrending(data.trending.slice(0, 3));
        }
      } catch (err) {
        console.error("Erro ao buscar músicas em alta:", err);
      }
    };
    fetchTrending();
  }, []);

  // 🔎 Busca de músicas por artista
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!search) return;

    const endpoint = `https://www.theaudiodb.com/api/v1/json/123/track-top10.php?s=${encodeURIComponent(
      search
    )}`;

    try {
      const res = await fetch(endpoint);
      const data = await res.json();
      setResults(data.track?.slice(0, 10) || []);
    } catch (err) {
      console.error("Erro ao buscar:", err);
    }
  };

  // ➕ Adicionar música à playlist
  const handleAddToPlaylist = (music: Track) => {
    if (!selectedPlaylist) {
      alert("Selecione uma playlist para adicionar.");
      return;
    }

    dispatch(addMusicToPlaylist({ playlistId: selectedPlaylist, music }));
    alert(`🎵 ${music.strTrack} adicionada à playlist!`);

    // Atualiza LocalStorage
    const playlistsLS = JSON.parse(localStorage.getItem("playlists") || "[]");
    const updated = playlists.map((pl) =>
      pl.id === selectedPlaylist
        ? { ...pl, musicas: [...pl.musicas, music] }
        : pl
    );
    localStorage.setItem("playlists", JSON.stringify(updated));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Buscar Músicas</h2>

      {/* 🔍 Formulário de busca */}
      <form onSubmit={handleSearch} className="flex flex-wrap gap-3 mb-6">
        <input
          type="text"
          placeholder="Digite o nome do artista..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg p-2 flex-1 min-w-[200px]"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700"
        >
          Buscar
        </button>
      </form>

      {/* 🔥 Músicas em alta */}
      <h3 className="text-xl font-semibold mb-3">🔥 Músicas em Alta</h3>
      <div className="flex gap-6 justify-center mb-10 flex-wrap">
        {trending.map((music) => (
          <div
            key={music.idTrend || music.idTrack}
            className="bg-white shadow-md rounded-lg p-4 w-60 text-center hover:shadow-lg transition"
          >
            <h4 className="font-semibold">Musica: {music.strTrack}</h4>
            <p className="text-gray-500">Artista: {music.strArtist}</p>
          </div>
        ))}
      </div>

      {/* 🎧 Resultados da busca */}
      <h3 className="text-xl font-semibold mb-3">🔍 Resultados</h3>

      {results.length > 0 && (
        <>
          <div className="flex items-center gap-3 mb-4">
            <label htmlFor="playlist" className="font-medium">
              Adicionar à playlist:
            </label>
            <select
              id="playlist"
              value={selectedPlaylist}
              onChange={(e) => setSelectedPlaylist(e.target.value)}
              className="border rounded-lg p-2"
            >
              <option value="">Selecione...</option>
              {playlists.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nome}
                </option>
              ))}
            </select>
          </div>

          <ul className="space-y-3">
            {results.map((track, i) => (
              <li
                key={track.idTrack || i}
                className="flex justify-between items-center bg-white shadow-sm rounded-lg p-3"
              >
                <span>
                  {i + 1}. {track.strTrack} — {track.strArtist}
                </span>
                <button
                  onClick={() => handleAddToPlaylist(track)}
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                >
                  + Adicionar
                </button>
              </li>
            ))}
          </ul>
        </>
      )}

      {results.length === 0 && (
        <p className="text-gray-500">Nenhum resultado encontrado.</p>
      )}
    </div>
  );
};

export default SearchPage;
