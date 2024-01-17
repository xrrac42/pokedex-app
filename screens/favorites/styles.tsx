// styles.ts

import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  title: {
    fontFamily: 'sans-serif',
    color: '#1d1c21',
    fontSize: 24,
    fontWeight: '500',
    marginTop: 30,
  },
  description: {
    fontFamily: 'sans-serif',
    color: '#1d1c21',
    marginTop: 30,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  iconContainer: {
    flexDirection: "row",
    marginTop: 8,
  },
  icon: {
    marginHorizontal: 4,
  },
  card: {
    backgroundColor: "#ededed",
    marginVertical: 8,
    elevation: 2,
    width: 150, 
    margin: 8, 
  },
  pokemonImage: {
    width: 120,
    height: 120, 
    borderRadius: 60, 
    marginBottom: 8, 
  },
});

export default styles;
