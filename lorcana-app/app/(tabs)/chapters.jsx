import React, { useState, useEffect } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function Chapters() {
  const router = useRouter();
  const [sets, setSets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSets = async () => {
    setLoading(true);
    setError(null);
    
    try {
      let response = await fetch('https://lorcana.brybry.fr/api/sets', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // If first attempt fails, try once more
      if (!response.ok) {
        response = await fetch('https://lorcana.brybry.fr/api/sets', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }

      if (!response.ok) {
        throw new Error('Impossible de charger les chapitres. Veuillez réessayer plus tard.');
      }

      const data = await response.json();
      setSets(data);
    } catch (error) {
      console.error('Fetch error:', error);
      setError(error.message || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchSets();
  }, []);

  const renderSetItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.setItem} 
      onPress={() => router.push(`/(tabs)/chapters/${item.id}`)}
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
