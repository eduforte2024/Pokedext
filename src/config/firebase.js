s (Listagem, Firebase Read, Update e Delete)            import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { db } from '../config/firebase';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState([]);

  const fetchFavorites = async () => {
    const querySnapshot = await getDocs(collection(db, "favorites"));
    const list = [];
    querySnapshot.forEach((doc) => {
      list.push({ id: doc.id, ...doc.data() });
    });
    setFavorites(list);
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  // Operação de Update (Editar Apelido do Pokémon)
  const editNickname = (id, currentName) => {
    Alert.prompt("Editar Apelido", "Insira o novo nome para o seu Pokémon:", [
      { text: "Cancelar", style: "cancel" },
      { text: "Salvar", onPress: async (newName) => {
          if(!newName) return;
          const docRef = doc(db, "favorites", id);
          await updateDoc(docRef, { name: newName });
          fetchFavorites(); // Atualiza a lista
        }
      }
    ], "plain-text", currentName);
  };

  // Operação de Delete (Remover do Firestore)
  const removeFavorite = async (id) => {
    await deleteDoc(doc(db, "favorites", id));
    alert("Removido com sucesso!");
    fetchFavorites();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meus Favoritos (CRUD Cloud)</Text>
      <FlatList 
        data={favorites}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item.name.toUpperCase()} ({item.type})</Text>
            <View style={styles.actions}>
              <TouchableOpacity style={styles.editBtn} onPress={() => editNickname(item.id, item.name)}>
                <Text style={styles.btnText}>✏️</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteBtn} onPress={() => removeFavorite(item.id)}>
                <Text style={styles.btnText}>🗑️</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#12121a', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#fff', marginBottom: 20, textAlign: 'center' },
  item: { backgroundColor: '#1a1a2e', padding: 15, borderRadius: 10, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  itemText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  actions: { flexDirection: 'row', gap: 10 },
  editBtn: { backgroundColor: '#f1c40f', padding: 8, borderRadius: 5 },
  deleteBtn: { backgroundColor: '#e74c3c', padding: 8, borderRadius: 5 },
  btnText: { color: '#fff' }
});