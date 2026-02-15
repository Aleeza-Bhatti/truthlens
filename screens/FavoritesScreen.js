import { useNavigation, useFocusEffect } from '@react-navigation/native';
import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import { getFavorites } from '../utils/favoritesStore';

export default function FavoritesScreen() {
  const navigation = useNavigation();
  const [favorites, setFavorites] = useState([]);

  useFocusEffect(
    useCallback(() => {
      getFavorites().then(setFavorites);
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.topSectionRow}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.title}>Favorites</Text>
          <Text style={styles.tagline}>Saved articles</Text>
        </View>
      </View>

      {favorites.length === 0 ? (
        <Text style={styles.emptyText}>No favorites yet. Tap the heart on any article to save it.</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.url || item.title}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate('ArticleDetail', { article: item })}
              activeOpacity={0.8}
            >
              {item.urlToImage && (
                <Image source={{ uri: item.urlToImage }} style={styles.cardImage} />
              )}
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardSource}>
                {item.source?.name ?? 'Source'} · {item.publishedAt ? new Date(item.publishedAt).toLocaleDateString() : ''}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  topSectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  backButton: {
    backgroundColor: '#333',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginRight: 12,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  tagline: {
    fontSize: 14,
    color: '#aaa',
  },
  emptyText: {
    color: '#888',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 40,
    paddingHorizontal: 20,
  },
  list: {
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  cardImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  cardSource: {
    fontSize: 12,
    color: '#aaa',
  },
});
