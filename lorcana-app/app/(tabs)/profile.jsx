import React, { useState } from "react";
import { View, Text, Button, Alert, ActivityIndicator, StyleSheet } from "react-native";
import { useAuth } from "../context/AuthContext";
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from "expo-router";

export default function Profile() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      router.replace("/");
      Alert.alert("Déconnexion réussie", "Vous avez été déconnecté avec succès.");
    } catch (error) {
      Alert.alert("Erreur", "Échec de la déconnexion. Veuillez réessayer.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      justifyContent: 'center',
      alignItems: 'center'
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 30,
      textAlign: 'center',
      color: '#333',
    },
    userInfo: {
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 10,
      width: '90%',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 3,
    },
    label: {
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 10,
      color: '#555',
    },
    value: {
      fontSize: 16,
      marginBottom: 10,
      color: '#666',
      paddingLeft: 10
    },
    noUser: {
      fontSize: 16,
      textAlign: 'center',
      color: '#888',
    },
    logoutButton: {
      marginTop: 30,
      width: '80%',
      alignSelf: 'center',
    },
  });

  return (
    <LinearGradient
      colors={['#ffffff', '#800080']}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Profil</Text>

        {user ? (
          <View style={styles.userInfo}>
            <Text style={styles.label}>Nom :</Text>
            <Text style={styles.value}>{user.name}</Text>

            <Text style={styles.label}>Email :</Text>
            <Text style={styles.value}>{user.email}</Text>
          </View>
        ) : (
          <Text style={styles.noUser}>Aucun utilisateur connecté.</Text>
        )}

        {user && (
          <View style={styles.logoutButton}>
            {isLoggingOut ? (
              <ActivityIndicator size="small" color="#0000ff" />
            ) : (
              <Button 
                title="Se déconnecter" 
                onPress={handleLogout} 
                color="#800080"
              />
            )}
          </View>
        )}
      </View>
    </LinearGradient>
  );
}
