import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {Text, View, TouchableOpacity, Image } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type MainStackParamList = {
  MainTabs: undefined;
}

type MainScreenNavigationProp = StackNavigationProp<MainStackParamList, 'MainTabs'>;



const Home: React.FC = () => {
  const navigation = useNavigation()
  const pokeballImageUrl = require('../../assets/pokemon-svgrepo-com.svg');



  return (
    <View style={styles.container}>

      <StatusBar style="auto" />
      <Image source={{ uri: pokeballImageUrl }} style={{ width: 300, height: 300 }} />
      <Text style={styles.pokedexText}> Pokedex</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => (navigation as unknown as MainScreenNavigationProp).navigate('MainTabs')}

      >
        <Text style={styles.textoBotao}>Iniciar</Text>
      </TouchableOpacity>
    </View>
  );
};



export default Home;
