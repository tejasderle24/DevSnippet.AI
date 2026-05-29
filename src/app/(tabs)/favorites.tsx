import Header from "@/components/common/Header";
import SnippetCard from "@/components/common/SnippetCard";
import { useTheme } from "@/context/ThemeContext";
import { getFavoriteSnippets, initSnippetDb } from "@/lib/snippets-db";
import { getTimeAgo } from "@/lib/time";
import { useFocusEffect } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useCallback, useState } from "react";
import { FlatList, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FavoritesScreen() {
  const { theme, isDarkMode } = useTheme();
  const [favorites, setFavorites] = useState<
    { id: string; title: string; code: string; tags: string[]; timeAgo: string; isFavorite: boolean }[]
  >([]);

  const loadFavorites = useCallback(async () => {
    await initSnippetDb();
    const data = await getFavoriteSnippets();
    setFavorites(
      data.map((item) => ({
        id: String(item.id),
        title: item.title,
        code: item.code,
        tags: item.tags.length ? item.tags : [item.language.toUpperCase()],
        timeAgo: getTimeAgo(item.updatedAt),
        isFavorite: item.isFavorite,
      }))
    );
  }, []);

  useFocusEffect(
    useCallback(() => {
      void loadFavorites();
    }, [loadFavorites])
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background || "#0e0e11" }]}>
      <StatusBar style={isDarkMode ? "light" : "dark"} />
      <Header />
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<Text style={[styles.emptyText, { color: theme.subText }]}>No favorite snippets yet.</Text>}
        renderItem={({ item }) => (
          <SnippetCard
            id={item.id}
            title={item.title}
            code={item.code}
            timeAgo={item.timeAgo}
            tags={item.tags}
            isFavorite={item.isFavorite}
            onFavoriteChange={(snippetId, nextValue) => {
              if (!nextValue) {
                setFavorites((prev) => prev.filter((entry) => entry.id !== snippetId));
              }
            }}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 30,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 14,
  },
});
