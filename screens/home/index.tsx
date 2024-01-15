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
  const pokeballImageUrl = require('../../assets/PngItem_1830149.png');



  return (
    <View style={styles.container}>

      <StatusBar style="auto" />
      <Image source={ pokeballImageUrl } style={{ width: 150, height: 150 }} />
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
