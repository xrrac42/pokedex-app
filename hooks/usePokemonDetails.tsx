import { useState } from 'react';

const usePokemonDetails = () => {
  const [pokemonDetails, setPokemonDetails] = useState<string | null>(null);

  const saveItem = (id: string) => {
    setPokemonDetails(id);
  };

  return { pokemonDetails, saveItem };
};

export default usePokemonDetails;
