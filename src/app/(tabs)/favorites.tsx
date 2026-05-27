import { StatusBar } from "expo-status-bar";
import { Text, View, StyleSheet, ScrollView, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/common/Header";
import { useTheme } from "@/context/ThemeContext";
import { useAppData } from "@/context/AppDataContext";
import SnippetCard from "@/components/home/SnippetCard";
import { toRelativeTime } from "@/lib/utils";

export default function FavoritesScreen() {
  const { theme, isDarkMode } = useTheme();
  const { snippets, toggleFavorite, loading, refresh } = useAppData();
  const favorites = snippets.filter((s) => s.isFavorite);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar style={isDarkMode ? "light" : "dark"} />
      <Header />
      <ScrollView contentContainerStyle={styles.content} refreshControl={<RefreshControl refreshing={loading} onRefresh={refresh} />}>
        {favorites.map((item) => (
          <SnippetCard
            key={item.id}
            id={item.id}
            filename={`${item.title}.${item.language.slice(0, 2).toLowerCase()}`}
            code={item.code}
            title={item.title}
            timeAgo={toRelativeTime(item.updatedAt)}
            tags={item.tags}
            isFavorite={item.isFavorite}
            onToggleFavorite={toggleFavorite}
          />
        ))}
        {favorites.length === 0 ? <Text style={styles.empty}>No favorites yet.</Text> : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({ container: { flex: 1 }, content: { padding: 16 }, empty: { color: "#888", textAlign: "center", marginTop: 32 } });
