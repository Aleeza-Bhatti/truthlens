import { useNavigation } from '@react-navigation/native';

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';

const API_KEY = '304fbb2f913a465097614357d7127e33'; // Replace this with your actual key

export default function NewsScreen() {
  const navigation = useNavigation(); 
  const [articles, setArticles] = useState([]);
  const [loadingMessage, setLoadingMessage] = useState('Loading...');
  const [currentTopic, setCurrentTopic] = useState(null); // Track selected topic

  const fetchNews = async (topic = null) => {
    setLoadingMessage('Loading...');
    setArticles([]);

    let url = '';

    if (topic) {
      // If a filter button is selected
      url = `https://newsapi.org/v2/everything?q=${topic}&language=en&sortBy=publishedAt&apiKey=${API_KEY}`;
    } else {
      // Default: Top headlines
      url = `https://newsapi.org/v2/top-headlines?language=en&apiKey=${API_KEY}`;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log('Fetched Data:', data);
      if (data.articles && data.articles.length > 0) {
        setArticles(data.articles);
      } else {
        setLoadingMessage('No articles found for this topic.');
      }
    } catch (error) {
      console.error('Failed to fetch news:', error);
      setLoadingMessage('Error loading articles.');
    }
  };

  useEffect(() => {
    fetchNews(); // Fetch general news on first load
  }, []);

  return (
    <View style={styles.container}>
      {/* Top Title Section */}

      <View style={styles.topSectionRow}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <View>
          <View style={styles.titleBlock}>
            <Text style={styles.title}>TRUTHLENS</Text>
          </View>
          <Text style={styles.tagline}>NEWS THAT DEMANDS ATTENTION</Text>
        </View>

      </View>



      {/* Filter Section */}
      <View style={styles.sectionWrapper}>
        <Text style={styles.sectionTitle}>Voice You Need to Hear</Text>

        <View style={styles.filterRow}>
          {['Genocide', 'Oppression', 'Climate'].map((topic) => (
            <TouchableOpacity
              key={topic}
              style={[
                styles.filterButton,
                currentTopic === topic && styles.activeFilter,
              ]}
              onPress={() => {
                setCurrentTopic(topic);
                fetchNews(topic.toLowerCase());
              }}
            >
              <Text style={styles.filterText}>{topic}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* No articles fallback */}
      {articles.length === 0 && (
        <Text style={styles.loadingText}>{loadingMessage}</Text>
      )}

      {/* News Article List */}
      <FlatList
        data={articles}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {item.urlToImage && (
              <Image source={{ uri: item.urlToImage }} style={styles.cardImage} />
            )}
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardSource}>
              {item.source.name} · {new Date(item.publishedAt).toLocaleTimeString()}
            </Text>
          </View>
        )}
        contentContainerStyle={styles.list}
      />
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

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 1,
    marginBottom: 4,
  },
  tagline: {
    fontSize: 14,
    color: '#aaa',
    marginBottom: 24,
    marginTop: 4,
    marginLeft: -5, // 👈 adjusts how far left it goes — tweak as needed
  },
  
  sectionWrapper: {
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  filterButton: {
    backgroundColor: '#333',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  activeFilter: {
    backgroundColor: '#e63946', // red highlight for active filter
  },
  filterText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  list: {
    paddingBottom: 80,
  },
  loadingText: {
    color: '#888',
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 20,
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

  topSectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },

  titleBlock: {
    marginLeft: 12, // space between Back button and title
  },

  backButton: {
    backgroundColor: '#333',
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginTop: -50
  },

  backButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },



});
