import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, Animated, TouchableOpacity, Alert } from 'react-native';
import { db } from '../config/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function DetailsScreen({ route, navigation }) {
  const { pokemon } = route.params;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleFavorite = async () => {
    try {
      await addDoc(collection(db, "favorites"), {
        pokeId: pokemon.id,
        name: pokemon.name,
        type: pokemon.types[0].type.name,
        imageUrl: pokemon.sprites.other['official-artwork'].front_default
      });
      Alert.alert('Sucesso', `${pokemon.name} salvo com sucesso no Firestore!`);
      navigation.navigate('Favorites');
    } catch (e) {
      console.error("Erro ao salvar documento: ", e);
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
        <Image source={{ uri: pokemon.sprites.other['official-artwork'].front_default }} style={styles.image} />
        <Text style={styles.title}>{pokemon.name.toUpperCase()}</Text>
        <Text style={styles.text}>ID: {pokemon.id}</Text>
        <Text style={styles.text}>Tipo Principal: {pokemon.types[0].type.name}</Text>
        <Text style={styles.text}>Peso: {pokemon.weight / 10} kg</Text>

        <TouchableOpacity style={styles.favButton} onPress={handleFavorite}>
          <Text style={styles.buttonText}>Adicionar aos Favoritos (Firebase)</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#12121a', padding: 20, justifyContent: 'center' },
  card: { backgroundColor: '#1a1a2e', borderRadius: 20, padding: 30, alignItems: 'center' },
  image: { width: 200, height: 200 },
  title: { color: '#fff', fontSize: 26, fontWeight: 'bold', marginVertical: 10 },
  text: { color: '#ccc', fontSize: 16, marginBottom: 5 },
  favButton: { backgroundColor: '#2ecc71', padding: 15, borderRadius: 10, marginTop: 20, width: '100%', alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' }
});
