import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Animated, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { db } from '../config/firebase';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

export default function HomeScreen() {
  const [search, setSearch] = useState('');
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [scaleAnim] = useState(new Animated.Value(0.3));

  useEffect(() => { fetchPokemon(1); }, []);

  const triggerAnimation = () => {
    scaleAnim.setValue(0.3);
    Animated.spring(scaleAnim, { toValue: 1, friction: 5, useNativeDriver: true }).start();
  };

  const fetchPokemon = async (idOrName) => {
    if (!idOrName) return;
    setLoading(true);
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${idOrName.toString().toLowerCase().trim()}`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setPokemon(data);
      triggerAnimation();
    } catch (err) {
      Alert.alert("Erro", "Pokémon não encontrado!");
    } finally {
      setLoading(false);
    }
  };

  const saveFavorite = async () => {
    if (!pokemon) return;
    try {
      const q = query(collection(db, "favoritos"), where("pokeId", "==", pokemon.id));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        Alert.alert("Aviso", "Este Pokémon já está nos favoritos!");
        return;
      }

      await addDoc(collection(db, "favoritos"), {
        pokeId: pokemon.id,
        nome: pokemon.name,
        apelido: pokemon.name.toUpperCase(),
        imagem: pokemon.sprites.front_default,
        tipo: pokemon.types[0].type.name
      });
      Alert.alert("Sucesso", `${pokemon.name.toUpperCase()} salvo no Firebase!`);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar.");
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ alignItems: 'center', paddingBottom: 30 }}>
      <TouchableOpacity style={styles.btnRandom} onPress={() => fetchPokemon(Math.floor(Math.random() * 151) + 1)}>
        <Text style={styles.btnText}>🎲 Roleta Aleatória</Text>
      </TouchableOpacity>

      <View style={styles.searchRow}>
        <TextInput style={styles.input} placeholder="Buscar por nome ou ID..." placeholderTextColor="#a0a0b5" value={search} onChangeText={setSearch} />
        <TouchableOpacity style={styles.btnSearch} onPress={() => { fetchPokemon(search); setSearch(''); }}>
          <Text style={styles.btnText}>Buscar</Text>
        </TouchableOpacity>
      </View>

      {loading && <ActivityIndicator size="large" color="#f1c40f" style={{ marginTop: 20 }} />}

      {pokemon && !loading && (
        <View style={styles.card}>
          <Animated.Image source={{ uri: pokemon.sprites.front_default }} style={[styles.img, { transform: [{ scale: scaleAnim }] }]} />
          <Text style={styles.title}>{pokemon.name.toUpperCase()}</Text>
          <Text style={styles.info}>Nº {pokemon.id} - Tipo: {pokemon.types.map(t => t.type.name.toUpperCase()).join('/')}</Text>
          <Text style={styles.info}>⚖️ {pokemon.weight / 10} kg  |  📏 {pokemon.height / 10} m</Text>
          
          <TouchableOpacity style={styles.btnFav} onPress={saveFavorite}>
            <Text style={[styles.btnText, { color: '#13131a' }]}>⭐ Salvar nos Favoritos</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#13131a', padding: 20 },
  btnRandom: { backgroundColor: '#9b59b6', width: '100%', padding: 15, borderRadius: 10, alignItems: 'center', marginBottom: 20, marginTop: 10 },
  btnText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  searchRow: { flexDirection: 'row', width: '100%', gap: 10, marginBottom: 20 },
  input: { flex: 1, backgroundColor: '#1c1c24', color: 'white', padding: 12, borderRadius: 10, borderWith: 1, borderColor: '#2c2c38' },
  btnSearch: { backgroundColor: '#ef5350', paddingHorizontal: 20, justifyContent: 'center', borderRadius: 10 },
  card: { backgroundColor: '#1c1c24', width: '100%', borderRadius: 20, padding: 20, alignItems: 'center', borderWith: 1, borderColor: '#2c2c38' },
  img: { width: 160, height: 160 },
  title: { color: 'white', fontSize: 24, fontWeight: 'bold', marginVertical: 10 },
  info: { color: '#a0a0b5', fontSize: 16, marginBottom: 5 },
  btnFav: { backgroundColor: '#f1c40f', width: '100%', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 20 }
});
