import React from 'react';
import {Dimensions, StyleSheet, StatusBar} from 'react-native';
import { transparent } from 'react-native-paper/lib/typescript/styles/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#437c8d',
    paddingLeft: 10,
    paddingTop: 25,
  },
  item: {
    marginHorizontal: 8,
    padding: 10,
    width: 120,
    height: 120,
    justifyContent: 'center',
  },
  // title: {
  //   fontSize: 25,
  // },
  // cabecalho: {
  //   flex: 0.2,
  //   justifyContent: 'flex-end',
  //   alignItems: 'center',
  // },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
    marginTop: -15,
    marginBottom: 15,
  },
  subtitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  recentes: {
    backgroundColor: '#54b69e',
    justifyContent: 'flex-start',
    flex: 7,
  },
  cardrecentes: {
    marginHorizontal: 0,
    padding: 0,
    width: 120,
    height: 120,
    justifyContent: 'center',
  },
  destaques: {
    marginTop: 30,
    alignItems: 'baseline',
    justifyContent: 'flex-start',
    fontSize: 20,
    fontWeight: 'bold',
  },
  card: {
    alignItems: 'center',
    height: 200,
    weight: 200,
    backgroundColor: '#437c8d',
  },
  cardcover: {
    marginTop: 10,
    height: 150,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  parag: {
    fontSize: 12,
    marginTop: -10,
  },
});