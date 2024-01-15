import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./styles";
import Icon from "react-native-vector-icons/FontAwesome"; 
import { useRoute } from "@react-navigation/native";


const PokemonDetail: React.FC = () => {

const route = useRoute();
const  id:any = route.params;
  const pokeballImageUrl = require('../../assets/PngItem_1830149.png');
  const [pokemonDetails, setPokemonDetails] = useState({})


  interface Pokemon {
    id: number;
    name: string;
    imageUrl: string;
  }

  useEffect(() => {
    console.log(typeof(id.id))
    const idString = String(id.id)
    const fetchData = async () => {
        try {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id.id}`);
          const pokemonDetails = await response.json();
         
         ;
         setPokemonDetails({
            id: pokemonDetails.id,
            name: pokemonDetails.name,
            imageUrl: pokemonDetails.sprites.front_default,
            
        })

        } catch (error) {
          console.error("Erro ao buscar detalhes do Pokémon:", error);
        }
            
  }
  fetchData()} 
  )
 



  return (
    <View style={styles.container}>
      <Text style={[styles.namePokemon, styles.commonStyle]}>{pokemonDetails.name as string}</Text>
      <Text style={[styles.idPokemon, styles.commonStyle]}>#{pokemonDetails.id}</Text>
      <Image style={styles.pokemonImage} source={{uri:pokemonDetails.imageUrl}}/>
   
      <View style={styles.attributes}>
        <Text style={styles.textAttribute}>Poison</Text>
        <Text style={styles.textAttribute}>Plant</Text>
      </View>
       
      <TouchableOpacity style={styles.btnFavorites} onPress={ () =>{alert("adicionado aos favoritos")}}>
        <Text style={{fontFamily:"sans-serif", fontSize:18}}> Adicionar aos favoritos </Text>
          <Icon name="heart" size={18} color={"red"}/>
        </TouchableOpacity>
    </View>
  );
}

export default PokemonDetail;



