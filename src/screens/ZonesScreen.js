import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Image, Alert } from 'react-native';

export default function ZonesScreen() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const fetchZonePokemon = async (targetType) => {
    setLoading(true);
    setResult(null);
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/type/${targetType}`);
      const typeData = await response.json();
      const rawList = typeData.pokemon;

      let attempts = 0;
      let found = false;
      let data = null;

      while (attempts < 15 && !found) {
        attempts++;
        const randomIndex = Math.floor(Math.random() * rawList.length);
        const resDetails = await fetch(rawList[randomIndex].pokemon.url);
        data = await resDetails.json();
        if (data.types && data.types[0].type.name === targetType) found = true;
      }

      setResult(data);
    } catch (error) {
      Alert.alert("Erro", "Erro ao buscar no habitat.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Sorteie um Pokémon exclusivo pelo seu habitat elemental puro!</Text>
      
      <View style={styles.grid}>
        <TouchableOpacity style={[styles.btnZone, { backgroundColor: '#ff5e62' }]} onPress={() => fetchZonePokemon('fire')}><Text style={styles.textZone}>🔥 Fogo</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.btnZone, { backgroundColor: '#2193b0' }]} onPress={() => fetchZonePokemon('water')}><Text style={styles.textZone}>💧 Água</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.btnZone, { backgroundColor: '#11998e' }]} onPress={() => fetchZonePokemon('grass')}><Text style={styles.textZone}>🌿 Grama</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.btnZone, { backgroundColor: '#f39c12' }]} onPress={() => fetchZonePokemon('electric')}><Text style={styles.textZone}>⚡ Elétrico</Text></TouchableOpacity>
      </View>

      {loading && <ActivityIndicator size="large" color="#f1c40f" style={{ marginTop: 30 }} />}

      {result && !loading && (
        <View style={styles.resultCard}>
          <Image source={{ uri: result.sprites.front_default }} style={styles.img} />
          <Text style={styles.resultName}>{result.name.toUpperCase()}</Text>
          <Text style={styles.resultType}>Tipo Principal Seguro: {result.types[0].type.name.toUpperCase()}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#13131a', padding: 20, alignItems: 'center' },
  subtitle: { color: '#a0a0b5', textAlign: 'center', marginBottom: 20, fontSize: 14 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 15, justifyContent: 'center', width: '100%' },
  btnZone: { width: '45%', padding: 20, borderRadius: 15, alignItems: 'center' },
  textZone: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  resultCard: { backgroundColor: '#1c1c24', marginTop: 30, width: '100%', padding: 20, borderRadius: 15, alignItems: 'center', borderColor: '#2c2c38', borderWidth: 1 },
  img: { width: 120, height: 120 },
  resultName: { color: 'white', fontSize: 20, fontWeight: 'bold', marginVertical: 5 },
  resultType: { color: '#2ecc71', fontSize: 14, fontWeight: 'bold' }
});
