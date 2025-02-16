import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet, Alert } from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { LinearGradient } from 'expo-linear-gradient';

export default function Chapters() {
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    let retryCount = 0;
    const maxRetries = 3;
    
    const fetchSets = async () => {
      try {
        console.log('Fetching chapters data...');
        const response = await fetch('https://lorcana.brybry.fr/api/sets', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Chapters data received:', data);
        setChapters(data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des chapitres:', error);
        if (retryCount < maxRetries) {
          retryCount++;
          console.log(`Retrying... Attempt ${retryCount} of ${maxRetries}`);
          setTimeout(fetchSets, 2000); // Retry after 2 seconds
        } else {
          Alert.alert('Erreur', 'Impossible de charger les chapitres. Veuillez réessayer plus tard.');
          setChapters([]); // Clear chapters to show empty state
          setLoading(false);
        }
      }
    };

    fetchSets();
  }, []);

  if (loading) {
    return (
      <LinearGradient
        colors={['#ffffff', '#800080']}
        style={{ flex: 1 }}
      >
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#800080" />
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={['#ffffff', '#800080']}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <Text style={styles.pageTitle}>Chapitres</Text>
        
        {chapters.length > 0 ? (
          <FlatList
            data={chapters}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.chapterCard}
                onPress={() => router.push(`/chapters/${item.id}`)}
              >
                <Text style={styles.chapterTitle}>{item.name}</Text>
              </TouchableOpacity>
            )}
            contentContainerStyle={styles.listContent}
          />
        ) : (
          <Text style={styles.emptyText}>Aucun chapitre disponible pour le moment.</Text>
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  listContent: {
    paddingBottom: 20,
  },
  chapterCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  },
  chapterTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#444',
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
    fontSize: 16,
  },
});
