import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    flex: 1,
  },
  namePokemon: {
    fontSize: 50,
    position: 'absolute',
    left: 20,
    top: 20, 
  },
  idPokemon: 
  {marginTop: 28,
    fontSize: 20,
    position: 'absolute',
    right: 20,
    top: 20, 
  },
  commonStyle: {
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
  },
  pokemonImage: {
    marginTop: '20%',
    width: 450,
    height: 450,
  },
  attributes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontWeight: 'bold',
    paddingHorizontal: 20,
  },
  textAttribute: {
    marginTop: 10,
    padding: 7,
    marginRight: 20,
    borderColor: 'black',
    borderRadius: 6,
    borderWidth: 1,
    paddingHorizontal: 10,
    fontWeight: '600',
    fontSize: 15,
  },
  btnFavorites: {
    marginTop: 30,
    flexDirection: 'row',
  },
  loadingContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    padding: 80,
  },
});

export default styles;
