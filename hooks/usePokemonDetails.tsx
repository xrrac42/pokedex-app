import { useState } from 'react';

const usePokemonFavorites = () => {
  const [pokemonDetails, setPokemonDetails] = useState<string | null>(null);

  const saveItem = (id: string) => {
    setPokemonDetails(id);
  };

  return { pokemonDetails, saveItem };
};

export default usePokemonFavorites;
