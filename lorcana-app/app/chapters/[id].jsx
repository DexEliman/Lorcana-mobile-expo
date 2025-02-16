import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function ChapterCards() {
  const { id } = useLocalSearchParams(); // Récupère l'ID du chapitre depuis l'URL
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const router = useRouter();

  useEffect(() => {
    if (!id) return;

    const fetchCardsBySet = useCallback(async (pageNumber = 1) => {
      try {
        // Check cache first
        const cacheKey = `cards_${id}_page_${pageNumber}`;
        const cachedData = await AsyncStorage.getItem(cacheKey);
        
        if (cachedData) {
          const parsedData = JSON.parse(cachedData);
          setCards(prev => pageNumber === 1 ? parsedData : [...prev, ...parsedData]);
          return;
        }

        const response = await fetch(
          `https://lorcana.brybry.fr/api/sets/${id}/cards`, 
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des cartes');
        }

        const data = await response.json();
        await AsyncStorage.setItem(cacheKey, JSON.stringify(data));
        
        setCards(prev => pageNumber === 1 ? data : [...prev, ...data]);
        setHasMore(data.length > 0);
      } catch (error) {
        console.error('Erreur:', error);
      } finally {
        setLoading(false);
      }
    }, [id]);

    // Load first page
    fetchCardsBySet(page);


  }, [id]);

  if (loading) return <ActivityIndicator size="large" style={styles.loading} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={cards}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        onEndReached={() => {
          if (hasMore) {
            setPage(prev => prev + 1);
            fetchCardsBySet(page + 1);
          }
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() => (
          hasMore && <ActivityIndicator size="small" color="#0000ff" />
        )}


        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/cards/${item.id}`)} // Redirige vers la carte sélectionnée
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.cardName}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  card: { flex: 1, margin: 5, alignItems: "center", backgroundColor: "#eee", padding: 10, borderRadius: 10 },
  image: { width: 100, height: 150, resizeMode: "contain" },
  cardName: { fontSize: 14, fontWeight: "bold", marginTop: 5, textAlign: "center" },
  loading: { flex: 1, justifyContent: "center", alignItems: "center" },
});
