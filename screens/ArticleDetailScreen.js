import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { isFavorite, addFavorite, removeFavorite } from '../utils/favoritesStore';

export default function ArticleDetailScreen() {
  const navigation = useNavigation();
  const { params } = useRoute();
  const article = params?.article ?? {};
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    isFavorite(article).then(setLiked);
  }, [article?.url]);

  const toggleFavorite = async () => {
    if (liked) {
      await removeFavorite(article);
      setLiked(false);
    } else {
      await addFavorite(article);
      setLiked(true);
    }
  };

  // NewsAPI sometimes truncates content with "[+1234 chars]" – strip that for in-app reading
  const rawContent = article.content || article.description || '';
  const bodyText = rawContent.replace(/\s*\[\+\d+\s*chars?\]\s*$/i, '').trim() || article.description || 'No full text available.';

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {article.urlToImage ? (
          <Image source={{ uri: article.urlToImage }} style={styles.heroImage} />
        ) : null}

        <View style={styles.content}>
          <Text style={styles.headline}>{article.title}</Text>
          <Text style={styles.meta}>
            {article.source?.name ?? 'Source'} · {article.publishedAt ? new Date(article.publishedAt).toLocaleString() : ''}
          </Text>
          <Text style={styles.body}>{bodyText}</Text>

          {article.url ? (
            <TouchableOpacity
              style={styles.readFullButton}
              onPress={() => navigation.navigate('ArticleWebView', { url: article.url })}
            >
              <Text style={styles.readFullButtonText}>Read full article</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.appName}>TRUTHLENS</Text>
        <TouchableOpacity
          style={styles.heartButton}
          onPress={toggleFavorite}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <Text style={styles.heartIcon}>{liked ? '❤️' : '🤍'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  heroImage: {
    width: '100%',
    height: 220,
    backgroundColor: '#1a1a1a',
    resizeMode: 'cover',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headline: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    lineHeight: 30,
    marginBottom: 10,
  },
  meta: {
    fontSize: 13,
    color: '#aaa',
    marginBottom: 18,
  },
  body: {
    fontSize: 16,
    color: '#e0e0e0',
    lineHeight: 24,
  },
  readFullButton: {
    marginTop: 24,
    backgroundColor: '#e63946',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  readFullButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    paddingBottom: 14 + 34,
    backgroundColor: '#1a1a1a',
  },
  backButton: {
    backgroundColor: '#333',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  appName: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  heartButton: {
    padding: 4,
  },
  heartIcon: {
    fontSize: 28,
  },
});
