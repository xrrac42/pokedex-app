import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

const Home = () => {
  const pokeballImageUrl = require('../../assets/pokemon-svgrepo-com.svg'); 

  return (
    <View style={styles.container}>
    
      <StatusBar style="auto" />
      <Image source={{ uri: pokeballImageUrl }} style={{ width: 300, height: 300 }} />
      <Text style={styles.pokedexText}> Pokedex</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          alert('Cliquei');
        }}
      >
        <Text style={styles.textoBotao}>Iniciar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9ffff ',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pokedexText: {

    fontFamily: 'sans-serif',
    color: '#1d1c21 ',
    fontSize: 24,
    fontWeight: '500',
    top: 30,
  },
  button: {
    top: 50,
    backgroundColor: '#1d1c21',
    padding: 15, // Ajuste a altura do botão aqui
    margin: 10,
    width: '50%',
    borderRadius: 8,
  },
  textoBotao: {
    fontFamily: 'Quicksand',
    fontWeight: 'bold',
    fontSize: 20,
    color: '#f9ffff',
    textAlign: 'center',
  },
});

export default Home;
