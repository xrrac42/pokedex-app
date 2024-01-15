import React from "react";
import { Text } from "react-native-paper";
import styles from "./styles";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { View } from "react-native";

const Favorites: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Meus Pokemons Favoritos 
      </Text>
      <Text style={styles.description}>
        Sua lista ainda está vazia. Vá adicionar (ﾉﾟ▽ﾟ)ﾉ
      </Text>
    </View>
  );
};

export default Favorites;
