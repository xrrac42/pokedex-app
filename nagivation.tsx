import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './screens/home/index';
import Main from './screens/main';
import Favorites from './screens/favorites';
import Icon from 'react-native-vector-icons/FontAwesome';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs = () => (
  <Tab.Navigator>
      <Tab.Screen name="Inicio" component={Main}  options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="home" size={size} color={color} /> // Substitua 'rocket' pelo nome do ícone desejado
        ), headerShown: false
    
      }}
        /> 
    <Tab.Screen name="Favoritos" component={Favorites} options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="star" size={size} color={color} /> // Substitua 'rocket' pelo nome do ícone desejado
        ), headerShown: false
    
      }} />
  </Tab.Navigator>
);

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{headerShown: false}} />
        <Stack.Screen name="MainTabs" component={MainTabs} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
