# TruthLens 

A mobile app that brings attention to underreported global news and injustice. Browse top headlines or filter by **Genocide**, **Oppression**, or **Climate** to see stories that demand attention.

## App Features

- News feed (headlines + topic filters)
- **Favorites**  Tap the heart on any article to save it; open **Favorites** from the News screen to see your saved articles (stored on device)
- Article detail and in-app full article (WebView)
- Navigation: Splash → News ↔ Favorites → Article detail

## Getting an API Key

The app uses [NewsAPI](https://newsapi.org) for articles. You need a free API key:

1. Go to [newsapi.org/register](https://newsapi.org/register).
2. Sign up (free). You’ll get an API key on the account page.
3. Copy `.env.example` to `.env` in this project.
4. In `.env`, add: `EXPO_PUBLIC_NEWS_API_KEY=your_key_here` (paste your key).



## How to Run
- _make sure you have the Expo Go app downloaded on your phone_
- `npm install`
- Add your API key to `.env` (see above).
- `npx expo start` then scan the QR code with Expo Go, or press `a` / `i` for a simulator.

## Figma prototype

[View Figma Prototype](https://www.figma.com/proto/hCEqGD9ldcUaYyPqF0616m/Untitled?node-id=1-3&t=sGeasnkGskNd8eh6-1)
