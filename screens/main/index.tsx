import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { Searchbar, Card, Title, Paragraph } from "react-native-paper";
import styles from "./styles";

interface Pokemon {
  id: number;
  name: string;
  imageUrl: string;
}

const Main: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);

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

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setOffset(0); 
  };

  const handleLoadMore = () => {
    setOffset((prevOffset) => prevOffset + 40); 
  };

  const renderPokemonCards = () => {
    const rows = [];
    for (let i = 0; i < pokemonList.length; i += 2) {
      const row = (
        <View key={i} style={styles.cardRow}>
          <View style={styles.cardPokemon}>
            {pokemonList[i] && (
              <Card style={styles.card}>
                <Card.Content>
                  <Image
                    source={{ uri: pokemonList[i].imageUrl }}
                    style={{ width: "100%", height: 80, resizeMode: "contain" }}
                  />
                  <Title>{pokemonList[i].name}</Title>
                  <Paragraph>#{pokemonList[i].id}</Paragraph>
                </Card.Content>
              </Card>
            )}
          </View>
          <View style={styles.cardPokemon}>
            {pokemonList[i + 1] && (
              <Card style={styles.card}>
                <Card.Content>
                  <Image
                    source={{ uri: pokemonList[i + 1].imageUrl }}
                    style={{ width: "100%", height: 80, resizeMode: "contain" }}
                  />
                  <Title>{pokemonList[i + 1].name}</Title>
                  <Paragraph>#{pokemonList[i + 1].id}</Paragraph>
                </Card.Content>
              </Card>
            )}
          </View>
        </View>
      );
      rows.push(row);
    }
    return rows;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pokedexText}>Pokedex</Text>
      <Text style={styles.descriptionText}>
        A Pokédex é uma ferramenta essencial para treinadores Pokémon, ajudando-os a aprender mais sobre as criaturas que encontram e a completar seus registros Pokémon.
      </Text>
      <Searchbar
        placeholder="Pesquise Aqui"
        onChangeText={handleSearch}
        value={searchQuery}
        style={styles.searchBar}
      />
      {error ? (
        <Text style={{ color: "red" }}>{error}</Text>
      ) : (
        <ScrollView onMomentumScrollEnd={handleLoadMore}>
          {renderPokemonCards()}
        </ScrollView>
      )}
    </View>
  );
};

export default Main;
