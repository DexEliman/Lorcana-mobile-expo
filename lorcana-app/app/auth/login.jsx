import React, { useState, useContext } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from "expo-router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { login } = useContext(AuthContext);
  const router = useRouter();

  const handleLogin = async () => {
    setErrorMessage("");
    try {
      await login(email, password);
      router.replace("/(tabs)/acceuil"); // Redirection après connexion réussie
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('Erreur lors de la connexion. Veuillez vérifier vos identifiants.');
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
    },
    input: {
      height: 50,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 15,
      marginBottom: 15,
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 30,
      textAlign: 'center',
      color: '#333',
    },
    buttonContainer: {
      marginTop: 20,
    },
    errorText: {
      color: 'red',
      marginTop: 15,
      textAlign: 'center',
      fontSize: 14,
    },
  });

  return (
    <LinearGradient
      colors={['#ffffff', '#800080']}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Connexion</Text>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Mot de passe"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
        <View style={styles.buttonContainer}>
          <Button 
            title="Se connecter" 
            onPress={handleLogin} 
            color="#800080"
          />
          {errorMessage ? (
            <Text style={styles.errorText}>{errorMessage}</Text>
          ) : null}
        </View>
      </View>
    </LinearGradient>
  );
}