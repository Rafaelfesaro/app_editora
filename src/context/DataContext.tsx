import React, {createContext, useState} from 'react';
import jwt_decode from 'jwt-decode';

import {DadosUsuarioType} from '../models/DadosUsuarioType';

export const DataContext = createContext({});

export const DataProvider = ({children}) => {
  const [dadosUsuario, setDadosUsuario] = useState<DadosUsuarioType>();
  const [editoraSelecionada, setEditoraSelecionada] = useState<number>();
  const [editoraNome, setEditoraNome] = useState<string>();
  const [livroSelecionado, setLivroSelecionado] = useState<number>();

  const [favBadge, setFavBadge] = useState(0);
  const favCont = (par = 0) => {
    if (par === 0) {
      setFavBadge(0);
    } else if (par === 1) {
      let cont = favBadge;
      setFavBadge(cont + 1);
    } else {
      let cont = favBadge;
      setFavBadge(cont - 1);
    }
  };
  const [carBadge, setCarBadge] = useState(0);
  const carCont = (par = 0) => {
    if (par === 0) {
      setCarBadge(0);
    } else if (par === 1) {
      let cont = carBadge;
      setCarBadge(cont + 1);
    } else {
      let cont = carBadge;
      setCarBadge(cont - 1);
    }
  };

  const armazenaDadosUsuario = (jwt: any) => {
    var tokenDecodificado: any = jwt_decode(jwt);

    var usuario = tokenDecodificado.usuario;

    usuario = JSON.parse(usuario);

    setDadosUsuario({
      id: usuario?.userId,
      nome: usuario?.usuarioNome,
      email: usuario?.userEmail,
      token: jwt,
    });
  };

  const amazenaEditoraSelecionada = (id: number) => {
    setEditoraSelecionada(id);
  };

  const amazenaEditoraNome = (nome: string) => {
    setEditoraNome(nome);
  };

  const amazenaLivroSelecionado = (id: number) => {
    setLivroSelecionado(id);
  };

  return (
    <DataContext.Provider
      value={{
        dadosUsuario,
        armazenaDadosUsuario,
        amazenaEditoraSelecionada,
        amazenaEditoraNome,
        amazenaLivroSelecionado,
        favBadge,
        favCont,
        carBadge,
        carCont,
      }}>
      {children}
    </DataContext.Provider>
  );
};
