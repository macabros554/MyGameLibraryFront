import { juegoConId } from "./juego.interface";

export interface juegoFavorito{
  idUsuario:string,
  idJuego:string,
}

export interface juegoFavoritoConId{
  id:string,
  idUsuario:string,
  idJuego:juegoConId,
}
