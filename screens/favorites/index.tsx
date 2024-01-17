import React, { useEffect, useState } from "react";
import { Card, Title, Text, Button } from "react-native-paper";
import { View, FlatList, Image, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useStorage from "../../hooks/useStorage";
import { StackNavigationProp } from '@react-navigation/stack';
import { capitalize } from "../../utils/utils";
import styles from "./styles";

import { useNavigation } from "@react-navigation/native";


interface FavoritesProps {}

interface PokemonDetails {
  id: string;
  name: string;
  imageUrl: string;
  types: string[];
}
type MainStackParamList = {
  PokemonDetail: { id: number };
}
type PokemonDetailScreenNavigationProp = StackNavigationProp<MainStackParamList, 'PokemonDetail'>;

const Favorites: React.FC<FavoritesProps> = () => {
  
  const navigation = useNavigation<PokemonDetailScreenNavigationProp>();
  const storage = useStorage();
  const [favoritePokemons, setFavoritePokemons] = useState<string[]>([]);
  const [favoritePokemonDetails, setFavoritePokemonDetails] = useState<
    PokemonDetails[]
  >([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const fetchFavoritePokemons = async () => {
      const favorites = await storage.getItem("favorites");
      setFavoritePokemons(favorites);
    };

    fetchFavoritePokemons();
  }, [storage]);

  const fetchFavoritePokemonDetails = async () => {
    try {
      setIsRefreshing(true);
      const details = await Promise.all(
        favoritePokemons.map(async (id) => {
          const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${id}`
          );
          const pokemonDetailsData = await response.json();
          return {
            id,
            name: pokemonDetailsData.name,
            imageUrl: pokemonDetailsData.sprites.front_default,
            types: pokemonDetailsData.types.map(
              (type: any) => type.type.name
            ),
          };
        })
      );
      setFavoritePokemonDetails(details);
    } finally {
      setIsRefreshing(false);
    }
  };
  const handlePress = (id: number) => {
  navigation.navigate('PokemonDetail', { id });
  };

  const removeItemAndUpdate = async (id: string) => {
    // Remove the item first
    await storage.removeItem("favorites", id);

    // After the removal is successful, fetch updated details
    fetchFavoritePokemonDetails();
  };
  return (
  
      <View style={styles.container}>
        <Text style={styles.title}>Meus Pokémons Favoritos</Text>
        {favoritePokemonDetails.length === 0 ? (
          <Text style={styles.description}>
       Se já adicionou pokémons, não esqueça de atualizar a página para ver as novidades (⌐▀͡ ̯ʖ▀).
          </Text>
        ) : (
          <FlatList
            style={{ marginTop: 20, marginBottom: 20 }}
            contentContainerStyle={{ alignItems: "center" }}
            data={favoritePokemonDetails}
            numColumns={2}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Card style={styles.card}>
                <Card.Content style={{ alignItems: "center" }}>
            
                  
                    <Image
                      style={styles.pokemonImage}
                      source={{ uri: item.imageUrl }}
                    />
            
                  <Title>{capitalize(item.name)}</Title>
                  <Text>ID: {item.id}</Text>
                  <View style={styles.iconContainer}>
                    <TouchableOpacity
                      onPress={() => removeItemAndUpdate(item.id)}
                    >
                      <MaterialCommunityIcons
                        name="trash-can-outline"
                        size={24}
                        color="black"
                        style={styles.icon}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                   
                    onPress={() => handlePress(parseInt(item.id))}
                    >
                    <MaterialCommunityIcons
                      name="eye-outline"
                      size={24}
                      color="black"
                      style={styles.icon}
                    />
                     </TouchableOpacity>
                  </View>
                </Card.Content>
              </Card>
            )}
            refreshing={isRefreshing}
            onRefresh={fetchFavoritePokemonDetails}
          />
        )}
        <Button
          icon="refresh"
          mode="outlined"
          onPress={fetchFavoritePokemonDetails}
          disabled={isRefreshing}
          labelStyle={{ color: "#1d1c21" }}
          style={{ marginTop: 10 }}
        >
          Atualizar Favoritos
        </Button>
      </View>
    );
  
};

export default Favorites;
