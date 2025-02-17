import { View, Text, Button, ActivityIndicator, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useWishlist } from '../context/WishlistContext';
import { LinearGradient } from 'expo-linear-gradient';


export default function WishlistDetail() {
  const { id } = useLocalSearchParams();
  const { wishlist, loading } = useWishlist();
  const router = useRouter();

  const item = wishlist.find((el) => el.id === id);

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

  if (!item) {
    return (
      <LinearGradient
        colors={['#ffffff', '#800080']}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          <Text style={styles.errorText}>Élément non trouvé dans votre wishlist</Text>
          <Button title="Retour" onPress={() => router.back()} />
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
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.detail}>Version: {item.version}</Text>
        <Text style={styles.detail}>Rareté: {item.rarity}</Text>
        <Button title="Retour" onPress={() => router.back()} />
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  detail: {
    fontSize: 16,
    marginBottom: 10,
    color: '#444',
    textAlign: 'center',
  },
  errorText: {
    fontSize: 18,
    color: '#ff4444',
    textAlign: 'center',
    marginBottom: 20,
  },
});
