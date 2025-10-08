export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Track {
  id: string;
  nome: string;
  artista?: string;
  genero?: string;
  ano?: string | number;
  raw?: any;
}

export interface Playlist {
  id: string;
  nome: string;
  usuarioId: string;
  musicas: Track[];
}