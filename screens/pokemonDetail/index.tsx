import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import styles from "./styles";
import Icon from "react-native-vector-icons/FontAwesome";
import { useRoute } from "@react-navigation/native";

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

  function capitalize(value: string) {
    return value[0].toUpperCase() + value.slice(1);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id.id}`);
        const pokemonDetailsData = await response.json();

        setPokemonDetails({
          id: pokemonDetailsData.id,
          name: pokemonDetailsData.name,
          imageUrl: pokemonDetailsData.sprites.front_default,
          types: pokemonDetailsData.types.map((type: any) => type.type.name), // Mapear os tipos
        });
      } catch (error) {
        console.error("Erro ao buscar detalhes do Pokémon:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id.id]);

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
      <Text style={[styles.namePokemon, styles.commonStyle]}>{capitalize(pokemonDetails.name)}</Text>
      <Text style={[styles.idPokemon, styles.commonStyle]}>#{pokemonDetails.id}</Text>
      <Image style={styles.pokemonImage} source={{ uri: pokemonDetails.imageUrl }} />

      <View style={styles.attributes}>
        {pokemonDetails.types.map((type, index) => (
          <Text key={index} style={styles.textAttribute}>{capitalize(type)}</Text>
        ))}
      </View>

      <TouchableOpacity style={styles.btnFavorites} onPress={() => { alert("adicionado aos favoritos") }}>
        <Text style={{ fontFamily: "sans-serif", fontSize: 18 }}> Adicionar aos favoritos </Text>
        <Icon name="heart" size={18} color={"red"} />
      </TouchableOpacity>
    </View>
  );
}

export default PokemonDetail;
