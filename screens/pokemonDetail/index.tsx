import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import styles from "./styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import useStorage from "../../hooks/useStorage";

interface PokemonDetails {
  id: string;
  name: string;
  imageUrl: string;
  types: string[];
}

const PokemonDetail: React.FC = () => {
  const route = useRoute();
  const id: any = route.params;
  const pokeballImageUrl = require('../../assets/PngItem_1830149.png');
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails>({ id: "000", name: 'Default', imageUrl: 'teste', types: [] });
  const [loading, setLoading] = useState(true);
  const storage = useStorage();
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  function capitalize(value: string) {
    return value[0].toUpperCase() + value.slice(1);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id.id}`);
        const pokemonDetailsData = await response.json();

        setPokemonDetails({
          id: pokemonDetailsData.id.toString(),
          name: pokemonDetailsData.name,
          imageUrl: pokemonDetailsData.sprites.front_default,
          types: pokemonDetailsData.types.map((type: any) => type.type.name)
        });
      } catch (error) {
        console.error("Erro ao buscar detalhes do Pokémon:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id.id]);

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      const savedPokemons = await storage.getItem("favorites");
      setIsFavorite(savedPokemons.includes(pokemonDetails.id));
    };
  
    checkFavoriteStatus();
  }, [storage, pokemonDetails.id]);
  
  const toggleFavorite = async () => {
    if (isFavorite) {
      await storage.removeItem("favorites", pokemonDetails.id);
    } else {
      await storage.saveItem("favorites", pokemonDetails.id);
    }
    setIsFavorite(!isFavorite);
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size={100} color="#1d1c21" />
        <Text style={{marginTop:25}}> Loading Pokémon...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image style={styles.pokemonImage} source={{uri:pokemonDetails.imageUrl}}/>
      <Text style={[styles.namePokemon, styles.commonStyle]}>{capitalize(pokemonDetails.name)}</Text>
      <Text style={[styles.idPokemon, styles.commonStyle]}>#{pokemonDetails.id}</Text>
      

      <View style={styles.attributes}>
        {pokemonDetails.types.map((type, index) => (
          <Text key={index} style={styles.textAttribute}>{capitalize(type)}</Text>
        ))}
      </View>

      <TouchableOpacity style={styles.btnFavorites} onPress={toggleFavorite}>
        <Text style={{ fontFamily: "sans-serif", fontSize: 18 }}>
          {isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
        </Text>
        <MaterialCommunityIcons
                        name="heart-plus"
                        size={24}
                        color={isFavorite ?  "grey"  : "red" }
                     
                        
                        
                      />
       
      </TouchableOpacity>
    </View>
  );
}

export default PokemonDetail;
