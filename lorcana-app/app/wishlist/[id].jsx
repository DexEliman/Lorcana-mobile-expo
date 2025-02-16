import { View, Text, Button } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useWishlist } from '../context/WishlistContext';

export default function WishlistDetail() {
  const { id } = useLocalSearchParams();
  const { wishlist } = useWishlist();
  const router = useRouter();

  const item = wishlist.find((el) => el.id === id);

  if (!item) return <Text>Élément non trouvé.</Text>;

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{item.name}</Text>
      <Button title="Retour" onPress={() => router.back()} />
    </View>
  );
}
