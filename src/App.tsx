import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Login from './pages/Login';
import Home from './pages/Home';
import HomeLivro from './pages/Livro';
import HomeEditoras from './pages/HomeEditoras';
import HomeEditora from './pages/HomeEditora';
import Favoritos from './pages/Favoritos';
import Carrinho from './pages/Carrinho';

import {DataProvider} from './context/DataContext';
import { DataContext } from './context/DataContext';

const TabBottomNavigation = createBottomTabNavigator();
const BottomNavigator = () => {
  const {favBadge, carBadge} = useContext(DataContext);
  return (
    <TabBottomNavigation.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {backgroundColor: '#038563'},
        tabBarStyle: {backgroundColor: '#038563'},
        tabBarActiveBackgroundColor: '#016737',
        tabBarInactiveTintColor: 'black',
        tabBarLabelStyle: {fontSize: 15},
      }}>
      <TabBottomNavigation.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Home',
          headerTitleStyle: {color: '#ffffff', fontSize: 26},
          tabBarIcon: () => <Ionicons name="home" color="#fff" size={24} />,
        }}
      />
      <TabBottomNavigation.Screen
        name="HomeEditorasTabScreen"
        component={HomeEditoras}
        options={{
          title: 'Editoras',
          headerTitleStyle: {color: '#ffffff', fontSize: 26},
          tabBarIcon: () => <Ionicons name="library" color="#fff" size={24} />,
        }}
      />
      <TabBottomNavigation.Screen
        name="Favoritos"
        component={Favoritos}
        options={{
          title: 'Favoritos',
          headerTitleStyle: {color: '#ffffff', fontSize: 26},
          tabBarIcon: () => <Ionicons name="heart-circle" color="#fff" size={24} />,
          tabBarBadge: favBadge ? favBadge : undefined,
        }}
      />
      <TabBottomNavigation.Screen
        name="Carrinho"
        component={Carrinho}
        options={{
          title: 'Carrinho',
          headerTitle: 'Carrinho de Compras',
          headerTitleStyle: {color: '#ffffff', fontSize: 26},
          tabBarIcon: () => <Ionicons name="cart" color="#fff" size={24} />,
          tabBarBadge: carBadge ? carBadge : undefined,
        }}
      />
      <TabBottomNavigation.Screen
        name="HomeEditoraScreen"
        component={HomeEditora}
        options={{
          headerTitle: 'Livros por Editora',
          headerTitleStyle: {color: '#ffffff', fontSize: 26},
          tabBarButton: props => null,
        }}
      />
      <TabBottomNavigation.Screen
        name="HomeLivro"
        component={HomeLivro}
        options={{
          headerTitle: 'Livros',
          tabBarButton: props => null,
        }}
      />
    </TabBottomNavigation.Navigator>
  );
};

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <DataProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="BottomNavigatorScreen"
            component={BottomNavigator}
            options={{headerShown: false}}
          />
          {/* <Stack.Screen
            name="HomeEditoraScreen"
            component={HomeEditora}
            options={{headerTitle: 'Editora'}}
          /> */}
          <Stack.Screen
            name="HomeEditoras"
            component={HomeEditoras}
            options={{title: 'Editoras'}}
          />
          {/* <Stack.Screen name="HomeLivro" component={HomeLivro} />  */}
          <Stack.Screen name="Favoritos" component={Favoritos} />
          <Stack.Screen name="Carrinho" component={Carrinho} />
        </Stack.Navigator>
      </NavigationContainer>
    </DataProvider>
  );
};
export default App;
