import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";


export default function ChapterDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [chapter, setChapter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChapter = async () => {
      try {
        const response = await fetch(`https://lorcana.brybry.fr/api/sets/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Erreur lors de la récupération du chapitre');
        }

        const data = await response.json();
        setChapter(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChapter();
  }, [id]);

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
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{chapter.name}</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailText}>Code: {chapter.code}</Text>
        <Text style={styles.detailText}>Date de sortie: {chapter.release_date}</Text>
        <Text style={styles.detailText}>Nombre de cartes: {chapter.card_number}</Text>
        
        <TouchableOpacity 
          style={styles.cardsButton}
          onPress={() => router.push(`/(tabs)/chapters/${id}/cards`)}
        >
          <Text style={styles.cardsButtonText}>Voir les cartes</Text>
        </TouchableOpacity>
      </View>
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
  detailsContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  detailText: {
    fontSize: 16,
    color: '#444',
    marginBottom: 10,
  },
  cardsButton: {
    backgroundColor: '#800080',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  cardsButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#ff4444',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});
