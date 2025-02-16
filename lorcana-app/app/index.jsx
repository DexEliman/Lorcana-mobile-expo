import { View, Text, Button, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";
import { ThemedView } from "../components/ThemedView";
import { LinearGradient } from 'expo-linear-gradient';


export default function Welcome() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={['#ffffff', '#800080']}
      style={{ flex: 1 }}
    >

      <Image source={require("../assets/images/logo.png")} style={styles.logo} />
      <Text style={styles.title}>Bienvenue sur Lorcana Collection</Text>
      <Text style={styles.subtitle}>Gérez votre collection de cartes facilement.</Text>

      <View style={styles.buttonContainer}>
        <Button title="Se connecter" onPress={() => router.push("/auth/login")} />
        <Button title="S'inscrire" onPress={() => router.push("/auth/register")} />
      </View>
    </LinearGradient>

  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center",
    padding: 20,
    textAlign: "center"
  },



  logo: { 
    width: 200, 
    height: 200, 
    marginBottom: 30,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignSelf: "center"
  },



  title: { 
    fontSize: 28, 
    fontWeight: "bold", 
    marginBottom: 10, 
    textAlign: "center",
    color: '#333'
  },

  subtitle: { 
    fontSize: 18, 
    marginBottom: 20, 
    textAlign: "center", 
    color: "#444",
    lineHeight: 24
  },

  buttonContainer: { 
    width: "80%", 
    gap: 15,
    marginTop: 20,
    alignSelf: "center"
  },


});
