import React, { useState, useEffect } from "react";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import { Searchbar, Card, Title, Paragraph } from "react-native-paper";
import { useNavigation } from '@react-navigation/native'; 
import { StackNavigationProp } from '@react-navigation/stack';
import { capitalize } from "../../utils/utils";
import axios from 'axios';
import styles from "./styles";
import Promise from 'bluebird';

interface Pokemon {
  id: number;
  name: string;
  imageUrl: string;
}

type MainStackParamList = {
  PokemonDetail: { id: number };
}

type PokemonDetailScreenNavigationProp = StackNavigationProp<MainStackParamList, 'PokemonDetail'>;

const Main: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const navigation = useNavigation<PokemonDetailScreenNavigationProp>();

  function isDigitString(input: string): boolean {
    const digitRegex = /^\d+$/;
    return digitRegex.test(input);
  }

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        let apiUrl = `https://pokeapi.co/api/v2/pokemon?limit=40&offset=${offset}`;

        if (searchQuery) {
        try {
            if(isDigitString(searchQuery)){}
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchQuery}`);
            const pokemonDetails = response.data;

            const pokemonById: Pokemon = {
              id: pokemonDetails.id,
              name: pokemonDetails.name,
              imageUrl: pokemonDetails.sprites.front_default,
            };

            setPokemonList([pokemonById]);
            return;
          

          }
          catch(erro){
            alert("pokemon nao encontrado")
          }
         
        }else { apiUrl = `https://pokeapi.co/api/v2/pokemon?limit=40&offset=${offset}`;
        }

        const response = await axios.get(apiUrl);
        const data = response.data;

        if (data.results && data.results.length > 0) {
          const newPokemonList: (Pokemon | null)[] = await Promise.map(data.results, async (pokemon: any) => {
            try {
              const response = await axios.get(pokemon.url);
              const pokemonDetails = response.data;

              return {
                id: pokemonDetails.id,
                name: pokemonDetails.name,
                imageUrl: pokemonDetails.sprites.front_default,
              };
            } catch (error) {
              if (axios.isAxiosError(error) && error.response?.status === 404) {
                console.warn(`Pokémon não encontrado: ${pokemon.name}`);
                return null;
              } else {
                console.error(`Erro ao buscar detalhes do Pokémon ${pokemon.name}:`, error);
                return null;
              }
            }
          });

          const successfulResults = newPokemonList.filter((result) => result !== null) as Pokemon[];

          setPokemonList(successfulResults);
        } else {
          setPokemonList([]);
        }
      } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
        setError("Erro ao buscar dados da API");
      }
    };

    fetchPokemonData();
  }, [offset, searchQuery]);
  

  const handlePress = (id: number) => {
    navigation.navigate('PokemonDetail', { id });
  };

  const handleLoadMore = () => {
    setOffset((prevOffset) => prevOffset + 40);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setOffset(0);
  };

  const renderPokemonCard = ({ item }: { item: Pokemon }) => (
    <View style={styles.cardPokemon}>
      <TouchableOpacity onPress={() => handlePress(item.id)}>
        <Card style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <Image
              source={{ uri: item.imageUrl }}
              style={styles.cardImage}
            />
            <Title>{capitalize(item.name)}</Title>
            <Paragraph>#{item.id}</Paragraph>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.pokedexText}>Pokédex</Text>
      <Text style={styles.descriptionText}>
      A Pokédex é uma ferramenta essencial para treinadores de Pokémon, auxiliando-os em sua jornada ao fornecer informações sobre as criaturas que encontram e ajudando a completar seus registros.      </Text>
      <Searchbar
        placeholder="Search by Pokemon name or ID"
        onChangeText={handleSearch}
        value={searchQuery}
        style={styles.searchBar}
      />
      {error ? (
        <Text style={{ color: "red" }}>{error}</Text>
      ) : (
        <FlatList
          data={pokemonList}
          renderItem={renderPokemonCard}
          keyExtractor={(item) => item.id.toString()}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
          numColumns={2}
        />
      )}
    </View>
  );
};

export default Main;
