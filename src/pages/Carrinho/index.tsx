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
  Dimensions,
  Alert,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import Loading from '../../components/Loading';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Card, Button} from 'react-native-paper';
import {DadosLivroType} from '../../models/DadosLivroType';
import {
  storeLocalData,
  incrementLocalData,
  retrieveLocalData,
  removeLocalData,
  clearStorage,
  removeFromFavoritosByKeyAndValue,
} from '../../services/LocalStorageService';
import { DataContext } from '../../context/DataContext';


const Carrinho = ({navigation}) => {
  const [data, setData] = useState<DadosLivroType[]>([]);
  const {favCont, carCont} = useContext(DataContext);
  const stackNavigator = navigation.getParent();

  const handleFetchData = async () => {
    const response = await retrieveLocalData('carrinho');
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
              {
                removeFromFavoritosByKeyAndValue('carrinho', item.codigoLivro),
                  carCont(-1);
              }
            }}>
            <Text style={styles.textoexcluir}>Excluir </Text>
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

  // useEffect(() => {
  //   // if (stackNavigator) {
  //     console.log(stackNavigator);
      
  //     stackNavigator.setOptions({tabBarBadge: 10});
  //   // }
  // }, [data]);

  useFocusEffect(
    useCallback(() => {
      handleFetchData();
      // carregar();
    }, [data]),
  );

  return (
    <SafeAreaView style={styles.container}>
      <Loading visible={visible} />
      <FlatList
        data={data}
        renderItem={CardLivro}
        keyExtractor={(item, indice) => indice}
      />
      <Button style={styles.botaocompra}
        color="black"
        onPress={() => {{
          removeLocalData('carrinho');
          carCont(0);
          Alert.alert('Compra realizada com sucesso!');
        }}}>
        <Text style={styles.textocompra}>Realizar compra </Text>

        <Fontisto name="shopping-bag" color="#000" size={30} />
      </Button>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  textocompra: {
    fontSize: 25,
    flexDirection: 'row',
  },
  textoexcluir: {
    fontSize: 20,
  },
  cardLivro: {
    marginHorizontal: 8,
    padding: 10,
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Carrinho;
