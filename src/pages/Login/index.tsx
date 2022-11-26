import React, {useContext, useState, useEffect} from 'react';
import {Paragraph, Dialog, Portal} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {
  Button,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';

import {styles} from './styles';
import AxiosInstance from '../../api/AxiosInstance';
import {DataContext} from '../../context/DataContext';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const {armazenaDadosUsuario} = useContext(DataContext);

  const handleLogin = async () => {
    console.log(`Email: ${email} - Senha: ${senha}`);
    var tokenJwt: any = null;

    try {
      setLoading(true);
      const retorno = await AxiosInstance.post('/auth/login', {
        email: email,
        password: senha,
      });

      if (retorno.status === 200) {
        //atribui a variavel tokenJwt o conteudo do retorno.data
        tokenJwt = retorno.data;
        //passa pro método do contexto o token jwt
        armazenaDadosUsuario(tokenJwt['jwt-token']);

        setLoading(false);
        navigation.navigate('BottomNavigatorScreen');

        Alert.alert('Seja bem-vindo!');
        console.log('Retorno: ' + JSON.stringify(retorno.data));
      } else {
        console.log('Erro ao realizar a autenticação');
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      Alert.alert(
        'Erro ao realizar login',
        'Por favor, verifique se o e-mail e a senha estão corretos.',
        [
          {
            text: 'Voltar',
            style: 'cancel',
          },
        ],
      );
    }
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="lightgreen" />
        <Text style={styles.conteudo}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.cabecalho}>
        <Ionicons name="md-logo-amplify" color="#164c3e" size={90} />
        <Text style={styles.titulo}>Bem-Vindo</Text>
        <Text style={styles.titulo}>ao BookTree</Text>
      </View>

      <View style={styles.conteudo}>
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          onChangeText={setEmail}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry={true}
          onChangeText={setSenha}
          value={senha}
        />
      </View>

      <View style={styles.rodape}>
        <TouchableOpacity style={styles.botao} onPress={() => handleLogin()}>
          <Text style={styles.textoBotao}>Login</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.conteudo2}>
        <Ionicons name="rocket-outline" color="#164c3e" size={30} />
        <Text style={styles.texto2}>Desenvolvido por Grupo3</Text>
      </View>
    </View>
  );
};

export default Login;
