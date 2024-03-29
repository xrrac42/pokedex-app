import { StyleSheet } from "react-native";
import { DefaultTheme } from "react-native-paper";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1d1c21', 
    text: '#555', 
    background: '#fff',
    error: 'red',
    card:  '#ededed',
  },
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    padding: 16,
    backgroundColor: theme.colors.background,
  },

  pokedexText: {
    fontFamily: 'sans-serif',
    color: theme.colors.primary,
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  descriptionText: {
    fontFamily: 'sans-serif',
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: "100",
    marginBottom: 15,
  },

  searchBar: {
    marginLeft:0,
    marginTop: 10,
    marginBottom: 15,
    borderRadius: 10,
    
    backgroundColor: theme.colors.card,
  },

  cardContainer: {
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.colors.card,
    overflow: 'hidden',
  },

  cardContent: {
    backgroundColor: "#f2f2f2",
    shadowColor: "none",
    alignItems: 'center',
    justifyContent: "center",
    borderRadius: 30
  },

  cardImage: {
    width: "100%",
    height: 80,
    resizeMode: "contain",
  },

card:{
  background: "none",
marginTop:10,

},
  cardPokemon: {
    background: "none",
    flex: 1,
    marginHorizontal: 5,
  },

  // cardRow: {
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   marginBottom: 20,
  // },
});

export default styles;
