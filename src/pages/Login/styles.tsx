import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#74f5ac',
  },

  cabecalho: {
    flex: 1.9,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
  },
  conteudo: {
    flex: 1,
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 2,
    borderRadius: 10,
    width: Dimensions.get('window').width * 0.9,
    marginVertical: 10,
    paddingHorizontal: 15,
    paddingVertical: 13,
    backgroundColor: '#f3fef8',
  },
  rodape: {
    flex: 1,
    alignItems: 'center',
  },
  botao: {
    backgroundColor: '#164c3e',
    width: Dimensions.get('window').width * 0.9,
    padding: 20,
    borderRadius: 10,
    marginTop: 30,
  },
  textoBotao: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  conteudo2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  texto2: {
    color: 'white',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
