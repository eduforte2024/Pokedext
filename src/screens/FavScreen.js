import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import { db } from '../config/firebase';
import { collection, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';

export default function FavScreen() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "favoritos"), (snapshot) => {
      const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setFavorites(list);
    });
    return () => unsub();
  }, []);

  const editNickname = (id, currentNick) => {
    Alert.prompt("Editar Apelido", "Insira o novo apelido customizado para o Firebase:", [
      { text: "Cancelar", style: "cancel" },
      { text: "Salvar", onPress: async (newNick) => {
          if (!newNick || newNick.trim() === "") return;
          try {
            await updateDoc(doc(db, "favoritos", id), { apelido: newNick.trim() });
          } catch { Alert.alert("Erro", "Não foi possível atualizar."); }
        }
      }
    ], "plain-text", currentNick);
  };

  const removeFavorite = (id) => {
    Alert.alert("Remover", "Deseja excluir este registro do Firebase?", [
      { text: "Não" },
      { text: "Sim, Excluir", style: "destructive", onPress: async () => {
          try { await deleteDoc(doc(db, "favoritos", id)); } catch { Alert.alert("Erro", "Falha ao deletar."); }
        }
      }
    ]);
  };

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <Text style={styles.emptyText}>Nenhum Pokémon salvo no banco de dados.</Text>
      ) : (
        <FlatList data={favorites} keyExtractor={item => item.id} renderItem={({ item }) => (
          <View style={styles.favItem}>
            <Image source={{ uri: item.imagem }} style={styles.avatar} />
            <View style={styles.info}>
              <Text style={styles.name}>{item.nome.toUpperCase()}</Text>
              <Text style={styles.nick}>"{item.apelido}"</Text>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity style={[styles.btnAction, { backgroundColor: '#2980b9' }]} onPress={() => editNickname(item.id, item.apelido)}><Text style={styles.btnText}>✏️</Text></TouchableOpacity>
              <TouchableOpacity style={[styles.btnAction, { backgroundColor: '#c0392b' }]} onPress={() => removeFavorite(item.id)}><Text style={styles.btnText}>🗑️</Text></TouchableOpacity>
            </View>
          </View>
        )} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#13131a', padding: 15 },
  emptyText: { color: '#a0a0b5', textAlign: 'center', marginTop: 40, fontStyle: 'italic' },
  favItem: { flexDirection: 'row', backgroundColor: '#1c1c24', padding: 12, borderRadius: 12, alignItems: 'center', marginBottom: 12, borderColor: '#2c2c38', borderWidth: 1 },
  avatar: { width: 60, height: 60 },
  info: { flex: 1, marginLeft: 12 },
  name: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  nick: { color: '#f1c40f', fontSize: 14, marginTop: 2 },
  actions: { flexDirection: 'row', gap: 8 },
  btnAction: { padding: 10, borderRadius: 8, width: 40, alignItems: 'center' },
  btnText: { color: 'white', fontWeight: 'bold' }
});
