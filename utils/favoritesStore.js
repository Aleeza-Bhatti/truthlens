import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = 'truthlens_favorites';

export async function getFavorites() {
  try {
    const raw = await AsyncStorage.getItem(FAVORITES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export async function addFavorite(article) {
  if (!article?.url) return;
  const list = await getFavorites();
  if (list.some((a) => a.url === article.url)) return;
  await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify([...list, article]));
}

export async function removeFavorite(article) {
  if (!article?.url) return;
  const list = await getFavorites();
  const next = list.filter((a) => a.url !== article.url);
  await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
}

export async function isFavorite(article) {
  if (!article?.url) return false;
  const list = await getFavorites();
  return list.some((a) => a.url === article.url);
}
