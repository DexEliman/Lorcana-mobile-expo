import React, { useState, useEffect } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Chapters() {
  const router = useRouter();
  const [sets, setSets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSets = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const token = await AsyncStorage.getItem('userToken');
      console.log('Token récupéré:', token); // Log du token récupéré

      if (!token) {
        throw new Error('Aucun token trouvé');
      }

      let response = await fetch('https://lorcana.brybry.fr/api/sets', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('Réponse de l\'API:', response); // Log de la réponse de l'API

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Erreur lors de la récupération des données:', errorData); // Log de l'erreur
        throw new Error('Erreur lors de la récupération des données utilisateur');
      }

      const data = await response.json();
      console.log('Données récupérées:', data); // Log des données récupérées
      setSets(data);
    } catch (error) {
      console.error('Fetch error:', error);
      setError(error.message || 'Une erreur est survenue');
    } finally {
      setLoading(false);
      console.log('Chargement terminé'); // Log de fin de chargement
    }
  };

  useEffect(() => {
    console.log('Composant monté, appel de fetchSets'); // Log lors du montage du composant
    fetchSets();
  }, []);

  const renderSetItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.setItem} 
      onPress={() => {
        console.log('Set sélectionné:', item); // Log de l'élément sélectionné
        router.push(`/(tabs)/chapters/${item.id}`);
      }}
    >
      <Text style={styles.setName}>{item.name}</Text>
      <Text style={styles.setCode}>Code: {item.code}</Text>
      <Text style={styles.releaseDate}>Date de sortie: {item.release_date}</Text>
      <Text style={styles.cardCount}>Cartes: {item.card_number}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#800080" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={fetchSets}
          >
            <Text style={styles.retryButtonText}>Réessayer</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Liste des Chapitres</Text>
      <FlatList
        data={sets}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderSetItem}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  listContent: {
    paddingBottom: 20,
  },
  setItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  setName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#444',
  },
  setCode: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  releaseDate: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  cardCount: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#ff4444',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginHorizontal: 20,
  },
  retryButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#800080',
    borderRadius: 8,
    alignSelf: 'center',
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});