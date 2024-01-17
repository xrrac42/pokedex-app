import AsyncStorage from "@react-native-async-storage/async-storage";

interface UseStorage {
  getItem: (key: string) => Promise<string[]>;
  saveItem: (key: string, value: string) => Promise<void>;
  removeItem: (key: string, item: string) => Promise<string[] | undefined>;
}

const useStorage = (): UseStorage => {
  const getItem = async (key: string): Promise<string[]> => {
    try {
      const data = await AsyncStorage.getItem(key);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.log("Erro ao buscar", error);
      return [];
    }
  };

  const saveItem = async (key: string, value: string): Promise<void> => {
    try {
      let pokemons = await getItem(key) || [];
      pokemons.push(value);
      await AsyncStorage.setItem(key, JSON.stringify(pokemons));
    } catch (error) {
      console.log("Erro ao salvar", error);
    }
  };

  const removeItem = async (key: string, item: string): Promise<string[] | undefined> => {
    try {
      let pokemons = await getItem(key);
      let mypokemon = pokemons.filter((pokemon: string) => pokemon !== item);
      await AsyncStorage.setItem(key, JSON.stringify(mypokemon));
      return mypokemon;
    } catch (error) {
      console.log("Erro ao deletar", error);
      return undefined;
    }
  };
  const clearAsyncStorage = async () => {
    try {
      await AsyncStorage.clear();
      alert('AsyncStorage limpo com sucesso!');
    } catch (error) {
      console.error('Erro ao limpar AsyncStorage:', error);
    }
  };

  return {
    getItem,
    saveItem,
    removeItem,
  };
};

export default useStorage;
