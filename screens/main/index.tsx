import React, { useState, useEffect } from "react";
import { View, Text, Image, FlatList } from "react-native";
import { Searchbar, Card, Title, Paragraph } from "react-native-paper";
import { useNavigation } from '@react-navigation/native'; 
import styles from "./styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StackNavigationProp } from '@react-navigation/stack';
import { capitalize } from "../../utils/utils";




interface Pokemon {
  id: number;
  name: string;
  imageUrl: string;
}

type MainStackParamList = {
  PokemonDetail: { id: number };
}

type  PokemonDetailScreenNavigationProp = StackNavigationProp<MainStackParamList, 'PokemonDetail'>;

const Main: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const navigation = useNavigation<PokemonDetailScreenNavigationProp>();

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=40&offset=${offset}`);
        const data = await response.json();

        const formattedData: Pokemon[] = await Promise.all(
          data.results.map(async (pokemon: any) => {
            try {
              const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
              const pokemonDetails = await response.json();

              return {
                id: pokemonDetails.id,
                name: pokemonDetails.name,
                imageUrl: pokemonDetails.sprites.front_default,
              };
            } catch (error) {
              console.error(`Erro ao buscar detalhes do Pokémon ${pokemon.name}:`, error);
              return null;
            }
          })
        );

        const filteredData = formattedData.filter((pokemon) => pokemon !== null);

        setPokemonList((prevList) => [...prevList, ...filteredData]);
      } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
        setError("Erro ao buscar dados da API");
      }
    };

    fetchPokemonData();
  }, [offset]);

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
  
  function capitalize(value:string){
    return value[0].toUpperCase () + value.slice(1)
  }

  const renderPokemonCard = ({ item }: { item: Pokemon }) => (
    <View style={styles.cardPokemon}>
      <TouchableOpacity onPress={() => handlePress(item.id)}>
        <Card style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <Image
              source={{ uri: item.imageUrl }}
              style={styles.cardImage}
              loadingIndicatorSource={{ uri: 'URL_PARA_PLACEHOLDER' }}
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
      A Pokédex é uma ferramenta essencial para os treinadores Pokémon, auxiliando-os em sua jornada ao proporcionar informações sobre as criaturas que encontram e ajudando a completar seus registros Pokémon.      </Text>
      <Searchbar
        placeholder="Pesquise por nome ou ID do Pokemon"
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
