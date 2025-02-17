import React, { useState, useEffect } from "react";
import { View, Text, Button, Alert, ActivityIndicator, StyleSheet } from "react-native";
import { useAuth } from "../context/AuthContext";
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from "expo-router";

export default function Profile() {
  const { user, logout, token } = useAuth();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [apiUser, setApiUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchUserData = async () => {
      try {
        const response = await fetch('https://lorcana.brybry.fr/api/me', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données utilisateur');
        }

        const data = await response.json();
        if (isMounted) {
          setApiUser(data);
        }
      } catch (error) {
        if (isMounted) {
          setError(error.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (token) {
      fetchUserData();
    }

    return () => {
      isMounted = false;
    };
  }, [token]);

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
    errorText: {
      fontSize: 16,
      textAlign: 'center',
      color: '#ff4444',
      marginBottom: 20,
    },
    linkContainer: {
      marginTop: 20,
      padding: 15,
      backgroundColor: '#fff',
      borderRadius: 10,
      width: '90%',
    },
    linkText: {
      fontSize: 16,
      color: '#800080',
      fontWeight: 'bold',
      textAlign: 'center',
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
        
        {loading ? (
          <ActivityIndicator size="large" color="#800080" />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : apiUser ? (
          <View style={styles.userInfo}>
            <Text style={styles.label}>Nom :</Text>
            <Text style={styles.value}>{apiUser.name}</Text>

            <Text style={styles.label}>Email :</Text>
            <Text style={styles.value}>{apiUser.email}</Text>
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
