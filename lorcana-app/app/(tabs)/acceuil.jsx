import { View, Text, StyleSheet } from "react-native";
import { useCollection } from "../context/CollectionContext";
import { Link } from "expo-router";
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen() {
  const { collection } = useCollection();

  return (
    <LinearGradient
      colors={['#ffffff', '#800080']}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Bienvenue sur Lorcana!</Text>
        <Text style={styles.subTitle}>Votre collection de cartes :</Text>
        <Text style={styles.collectionInfo}>
          Nombre de cartes : {collection.length}
        </Text>

        <View style={styles.buttonsContainer}>
          <Link href="/chapters" style={styles.button}>
            <Text style={styles.buttonText}>Voir les Chapitres</Text>
          </Link>
          <Link href="/collection" style={styles.button}>
            <Text style={styles.buttonText}>Voir ma Collection</Text>
          </Link>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    justifyContent: "center", 
    alignItems: "center",
    textAlign: "center"
  },
  title: { 
    fontSize: 28, 
    fontWeight: "bold", 
    marginBottom: 20,
    color: '#333'
  },
  subTitle: { 
    fontSize: 18, 
    marginBottom: 10,
    color: '#444'
  },
  collectionInfo: { 
    fontSize: 16, 
    marginBottom: 20,
    color: '#555'
  },
  buttonsContainer: { 
    width: "100%", 
    gap: 10 
  },
  button: {
    backgroundColor: "#800080",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: { 
    color: "#fff", 
    fontSize: 16, 
    fontWeight: "bold" 
  },
});
