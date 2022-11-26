import React, {useState, useEffect, useContext} from 'react';
import AxiosInstance from '../../api/AxiosInstance';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Dimensions,
  Image,
} from 'react-native';
import Loading from '../../components/Loading';

//Importando o contexto de data
import {DataContext} from '../../context/DataContext';

import {NavigationContainer} from '@react-navigation/native';

import {DadosEditoraType} from '../../models/DadosEditorasType';
import {DadosLivroType} from '../../models/DadosLivrosType';


const HomeEditora = ({route, navigation}) => {
  const {editoraId, nomeEditora} = route.params;

  const {dadosUsuario, favCont, carCont} = useContext(DataContext);
  const [dadosEditora, setDadosEditora] = useState<DadosEditoraType[]>([]);
  const [editoraNome, setEditoraNome] = useState<DadosEditoraType>();
  const [dadosLivro, setDadosLivro] = useState<DadosLivroType[]>([]);
  const [selectedId, setSelectedId] = useState(null);

  const [visible, setVisible] = useState(false);

  //este item estava acima de HomeEditora
  const Item = ({item, onPress, backgroundColor, textColor}) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Image style={styles.tinyLogo} source={{uri: item.urlImagem}} />
    <Text style={[styles.title, textColor]}>{item.nomeLivro}</Text>
    {/* <Text style={[styles.subtitle, textColor]}>{item.nomeEditora} </Text> */}
  </TouchableOpacity>
);

  function carregar() {
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
    }, 1000);
  }


  useEffect(() => {
    getAllLivrosEditora();
    carregar();
  }, []);

  console.log(nomeEditora);

  const getAllLivrosEditora = async () => {
    // setVisible(true)
    AxiosInstance.get(`/livros/por-editora/${editoraId}`, {
      headers: {Authorization: `Bearer ${dadosUsuario?.token}`},
    })
      .then(resultado => {
        // setVisible(false);
        console.log('Dados das editoras: ' + JSON.stringify(resultado.data));
        setDadosEditora(resultado.data);
      })
      .catch(error => {
        console.log(
          'Ocorreu um erro ao recuperar dador dos livros: ' +
            JSON.stringify(error),
        );
      });
  };

  const navigateToEditoraHome = (id: any) => {
    navigation.navigate('HomeLivro', {
      livroId:id,
    });
    console.log(id);
  };

  const renderItem = ({item}) => {
    const backgroundColor =
      item.codigoLivro === selectedId ? '#5e5e5e' : 'white';
    const color = item.codigoLivro === selectedId ? 'white' : 'black';
    const id = item.codigoLivro;
    
    return (
      <Item
        item={item}
        onPress={() => navigateToEditoraHome(id)}
        backgroundColor={{backgroundColor}}
        textColor={{color}}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Livros da Editora</Text>
      <Loading visible={visible} />
      <FlatList
        horizontal={false}
        data={dadosEditora}
        renderItem={renderItem}
        keyExtractor={item => item.nomeEditora}
        extraData={selectedId}
        numColumns={1}
        scrollToEnd
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: 'whaite',
    alignItems: 'center',
  },
  item: {
    marginTop: 50,
    width: Dimensions.get('window').width * 0.92,
    height: 220,
    padding: 10,
    paddingLeft: -50,
    borderRadius: 8,
    flexDirection: 'row',
  },
  title: {
    fontSize: 20,
    flex: 1,
    flexWrap: 'wrap',
    marginLeft: 10,
  },
  subtitle: {
    fontSize: 16,
  },
  sectionTitle: {
    marginTop: -17,
    marginBottom: 7,
    fontSize: 25,
    flexDirection: 'row',
  },
  tinyLogo: {
    width: 200,
    height: 200,
    resizeMode: 'stretch',
    justifyContent: 'center',
  },
});

export default HomeEditora;
