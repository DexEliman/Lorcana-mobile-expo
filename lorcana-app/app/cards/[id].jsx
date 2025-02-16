import { View, Text, Image, ActivityIndicator, StyleSheet, Button, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useCollection } from "../context/CollectionContext";
import { useWishlist } from "../context/WishlistContext";
import { LinearGradient } from 'expo-linear-gradient';

export default function CardDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);

  const { collection, addToCollection, removeFromCollection } = useCollection();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  useEffect(() => {
    if (!id) return;

    const fetchCardDetails = async () => {
      try {
        const response = await fetch(`https://lorcana.brybry.fr/api/sets/cards/${id}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (!data || !data.id) {
          throw new Error('Invalid card data received');
        }

        setCard(data);
      } catch (error) {
        console.error("Erreur lors du chargement des détails de la carte :", error);
        Alert.alert('Erreur', 'Impossible de charger les détails de la carte');
      } finally {
        setLoading(false);
      }
    };

    fetchCardDetails();
  }, [id]);

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

  if (!card) {
    return (
      <LinearGradient
        colors={['#ffffff', '#800080']}
        style={{ flex: 1 }}
      >
        <View style={styles.errorContainer}>
          <Text style={styles.error}>Carte introuvable</Text>
        </View>
      </LinearGradient>
    );
  }

  const isInCollection = collection.some((c) => c.id === card.id);
  const isInWishlist = wishlist.some((c) => c.id === card.id);

  return (
    <LinearGradient
      colors={['#ffffff', '#800080']}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <Image source={{ uri: card.image }} style={styles.image} />
        <Text style={styles.name}>{card.name}</Text>
        <Text style={styles.info}>Rareté : {card.rarity}</Text>
        <Text style={styles.info}>Type : {card.type}</Text>
        <Text style={styles.info}>Coût : {card.cost}</Text>

        <View style={styles.buttonContainer}>
          {isInCollection ? (
            <Button
              title="Retirer de la collection"
              color="red"
              onPress={() => {
                removeFromCollection(card.id);
                Alert.alert("Retiré", "Carte retirée de la collection.");
              }}
            />
          ) : (
            <Button
              title="Ajouter à la collection"
              onPress={() => {
                addToCollection({ id: card.id, name: card.name, image: card.image, normal: 1, shiny: 0 });
                Alert.alert("Ajouté", "Carte ajoutée à la collection !");
              }}
            />
          )}

          {isInWishlist ? (
            <Button
              title="Retirer de la wishlist"
              color="red"
              onPress={() => {
                removeFromWishlist(card.id);
                Alert.alert("Retiré", "Carte retirée de la wishlist.");
              }}
            />
          ) : (
            <Button
              title="Ajouter à la wishlist"
              onPress={() => {
                addToWishlist({ id: card.id, name: card.name, image: card.image });
                Alert.alert("Ajouté", "Carte ajoutée à la wishlist !");
              }}
            />
          )}
        </View>

        <Button title="Retour" onPress={() => router.back()} />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    alignItems: "center", 
    backgroundColor: "transparent" 
  },
  image: { 
    width: 250, 
    height: 350, 
    resizeMode: "contain", 
    marginBottom: 10 
  },
  name: { 
    fontSize: 24, 
    fontWeight: "bold", 
    marginBottom: 5, 
    textAlign: "center" 
  },
  info: { 
    fontSize: 16, 
    marginVertical: 3, 
    textAlign: "center" 
  },
  buttonContainer: { 
    marginTop: 20, 
    width: "100%", 
    gap: 10 
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: { 
    fontSize: 18, 
    color: "red" 
  },
});
