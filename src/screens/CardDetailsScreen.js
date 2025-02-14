import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { fetchCardDetails } from '../api/apiService';

const CardDetailsScreen = ({ cardId }) => {
  const router = useRouter();
  const [cardDetails, setCardDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCardDetails = async () => {
      try {
        const data = await fetchCardDetails(cardId);
        setCardDetails(data);
      } catch (error) {
        console.error('Failed to load card details:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCardDetails();
  }, [cardId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{cardDetails.name}</Text>
      <Text>{cardDetails.description}</Text>
      <Button title="Back to Chapter Cards" onPress={() => router.push('/ChapterCards')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default CardDetailsScreen;
