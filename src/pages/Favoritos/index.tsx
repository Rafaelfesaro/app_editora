import React, {useEffect, useState, useCallback, useContext} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  StatusBar,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
  RefreshControl,
  Dimensions
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import Loading from '../../components/Loading';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Card, Button} from 'react-native-paper';
import {DadosLivroType} from '../../models/DadosLivroType'
import {
  storeLocalData,
  incrementLocalData,
  retrieveLocalData,
  removeLocalData,
  clearStorage,
  removeFromFavoritosByKeyAndValue,
} from '../../services/LocalStorageService';
import { DataContext } from '../../context/DataContext';

const Favoritos = props => {
  const [data, setData] = useState<DadosLivroType[]>([]);
  const {favCont, carCont} = useContext(DataContext);

  const handleFetchData = async () => {
    const response = await retrieveLocalData('favoritos');
    setData(response ? JSON.parse(response) : []);
  };

  const Item = ({item}) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item}</Text>
    </View>
  );

  const CardLivro = ({item}) => {
    return (
      <Card style={styles.cardLivro}>
        <Card.Title title={item.nomeLivro} />
        <Card.Cover source={{uri: item.urlImagem}} />
        <Card.Actions style={{justifyContent: 'center'}}>
          <Button
            color="black"
            onPress={() => {
              removeFromFavoritosByKeyAndValue('favoritos', item.codigoLivro),
              favCont(-1)}
            }>
            <MaterialCommunityIcons
              name="delete-outline"
              color="#000"
              size={36}
            />
          </Button>
          {/* <Button type="button" onPress={}" removeLocalData(); location.reload();"> Limpar carrinho </Button> */}
        </Card.Actions>
      </Card>
    );
  };

  const [visible, setVisible] = useState(false);

  function carregar() {
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
    }, 1500);
  }

  useFocusEffect(
    useCallback(() => {
      handleFetchData();
      // carregar();
    }, [data]),
  );

  const renderItem = ({item}) => <Item item={item.nomeLivro} />;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.sections}>Meus Livros Favoritos</Text>
      <Loading visible={visible} />
      <FlatList
        data={data}
        renderItem={CardLivro}
        keyExtractor={(item, indice) => indice}
      />
      <Button
        color="black"
        onPress={() => removeLocalData('favoritos')}></Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  sections: {
    fontSize: 30,
    marginBottom: 15
  },
  cardLivro: {
    marginHorizontal: 8,
    padding: 10,
    justifyContent: 'center',
    marginBottom: 20,
  },
});

export default Favoritos;
