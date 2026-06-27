import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';

export default function HomeScreen({ navigation }) {
  const [pokemon, setPokemon] = useState(null);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentId, setCurrentId] = useState(1);

  const loadPokemon = async (idOrName) => {
    if (!idOrName) return;
    setLoading(true);
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${idOrName}`);
      setPokemon(response.data);
      setCurrentId(response.data.id);
    } catch (error) {
      Alert.alert('Erro', 'Pokémon não encontrado!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPokemon(currentId);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pokédex Expo</Text>
      
      <View style={styles.searchContainer}>
        <TextInput 
          style={styles.input} 
          placeholder="Buscar por nome ou ID..." 
          placeholderTextColor="#aaa"
          value={search}
          onChangeText={setSearch}
        />
        <TouchableOpacity style={styles.button} onPress={() => loadPokemon(search.toLowerCase().trim())}>
          <Text style={styles.buttonText}>Ir</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#ff4757" />
      ) : pokemon && (
        <TouchableOpacity 
          style={styles.card}
          onPress={() => navigation.navigate('Details', { pokemon })}
        >
          <Image 
            source={{ uri: pokemon.sprites.other['official-artwork'].front_default }} 
            style={styles.image}
          />
          <Text style={styles.name}>{pokemon.name.toUpperCase()}</Text>
          <Text style={styles.info}>Clique para ver Detalhes & Salvar</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity 
        style={[styles.button, { marginTop: 20 }]} 
        onPress={() => navigation.navigate('Favorites')}
      >
        <Text style={styles.buttonText}>Ir para Favoritos ⭐</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#12121a', padding: 20, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#ff4757', marginBottom: 20 },
  searchContainer: { flexDirection: 'row', width: '100%', marginBottom: 20 },
  input: { flex: 1, backgroundColor: '#1a1a2e', color: '#fff', borderRadius: 10, padding: 12, marginRight: 10 },
  button: { backgroundColor: '#ff4757', padding: 12, borderRadius: 10, justifyContent: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  card: { backgroundColor: '#1a1a2e', padding: 20, borderRadius: 20, alignItems: 'center', width: '100%' },
  image: { width: 150, height: 150 },
  name: { color: '#fff', fontSize: 22, fontWeight: 'bold', marginTop: 10 },
  info: { color: '#aaabbc', fontSize: 14, marginTop: 5 }
});
