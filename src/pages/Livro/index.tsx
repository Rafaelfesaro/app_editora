import React, {useContext, useEffect, useState} from 'react';
import AxiosInstance from '../../api/AxiosInstance';
import {
  View,
  ScrollView,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {styles} from './style';
import {Card, Button} from 'react-native-paper';
import {DataContext} from '../../context/DataContext';
import {DadosLivroType} from '../../models/DadosLivroType';
import {incrementLocalData} from '../../services/LocalStorageService';
import Loading from '../../components/Loading';

import {Item} from 'react-native-paper/lib/typescript/components/List/List';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HomeLivro = ({route, navigation}) => {
  const {livroId} = route.params;

  const [dadosLivro, setDadosLivro] = useState<DadosLivroType[]>([]);
  const {dadosUsuario, favCont, carCont} = useContext(DataContext);

  const getLivro = async () => {
    // setVisible(true)
    AxiosInstance.get(`/livros/${livroId}`, {
      headers: {Authorization: `Bearer ${dadosUsuario?.token}`},
    })
      .then(resultado => {
        // setVisible(false);
        console.log(
          'Dados das editoras: ' + JSON.stringify(resultado.data, null, 2),
        );
        setDadosLivro(resultado.data);
      })
      .catch(error => {
        console.log(
          'Ocorreu um erro ao recuperar dador dos livros: ' +
            JSON.stringify(error),
        );
      });
    console.log(livroId);
  };

  const [visible, setVisible] = useState(false);
  function carregar() {
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
    }, 1500);
  }

  useEffect(() => {
    getLivro();
    carregar();
  }, []);

  const addFavorite = (livro: DadosLivroType) => {
    //console.log(`Favoritos: Livro selecionado: ${JSON.stringify(livro)}`);
    incrementLocalData('favoritos', livro);
  };

  const addCart = (livro: DadosLivroType) => {
    // console.log(Carrinho: Livro selecionado: ${id});
    incrementLocalData('carrinho', livro);
  };

  return (
    <View>
      <Loading visible={visible} />
      {/* <Text>Pagina Livro, {dadosLivro.nomeLivro}</Text> */}

      <Card style={styles.cardLivro}>
        <Card.Title title={dadosLivro.nomeLivro} />
        <Card.Cover source={{uri: dadosLivro.urlImagem}} />
        <Card.Actions style={{justifyContent: 'center'}}>
          <Button
            onPress={() => {
              addFavorite(dadosLivro), favCont(1);
            }}>
            <Ionicons name="heart-circle" color="#000" size={36} />
          </Button>
          <Button
            onPress={() => {
              addCart(dadosLivro), carCont(1);
            }}>
            <Ionicons name="cart" color="#000" size={36} />
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

export default HomeLivro;
