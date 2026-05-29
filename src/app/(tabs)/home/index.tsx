import Header from "@/components/common/Header";
import SnippetCard from "@/components/common/SnippetCard";
import FavoriteCard from "@/components/home/FavoriteCard";
import LanguageFilters from "@/components/home/LanguageFilters";
import { useTheme } from "@/context/ThemeContext";
import { getAllSnippets, initSnippetDb } from "@/lib/snippets-db";
import { getTimeAgo } from "@/lib/time";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";

export default function HomeScreen() {
  const { theme, isDarkMode } = useTheme();
  const router = useRouter();
  const [snippets, setSnippets] = useState<
    { id: string; title: string; code: string; tags: string[]; timeAgo: string; isFavorite: boolean }[]
  >([]);

  const loadRecent = useCallback(async () => {
    await initSnippetDb();
    const all = await getAllSnippets();
    const recent = all.slice(0, 5).map((item) => ({
      id: String(item.id),
      title: item.title,
      code: item.code,
      tags: item.tags.length ? item.tags : [item.language.toUpperCase()],
      timeAgo: getTimeAgo(item.updatedAt),
      isFavorite: item.isFavorite,
    }));
    setSnippets(recent);
  }, []);

  useFocusEffect(
    useCallback(() => {
      void loadRecent();
    }, [loadRecent])
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar style={isDarkMode ? "light" : "dark"} />
      <Header />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <LanguageFilters />

        <View style={styles.sectionHeader}>
          <View>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Recent Snippets</Text>
            <Text style={[styles.sectionSubtitle, { color: theme.subText }]}>Your latest architectural blocks</Text>
          </View>
          <TouchableOpacity onPress={() => router.push("/home/view-all")}>
            <Text style={[styles.viewAllText, { color: theme.primary }]}>View All {"->"}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.listContainer}>
          {snippets.map((item) => (
            <SnippetCard
              key={item.id}
              id={item.id}
              title={item.title}
              timeAgo={item.timeAgo}
              code={item.code}
              tags={item.tags}
              isFavorite={item.isFavorite}
            />
          ))}
          {snippets.length === 0 && <Text style={{ color: theme.subText }}>No snippets yet. Tap + to create one.</Text>}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Favorites</Text>
        </View>

        <View style={styles.gridContainer}>
          <FavoriteCard title="Data Fetcher" description="Efficient async request handler using aiohttp..." langTag="PY" />
          <FavoriteCard title="Zod Schema" description="User validation schema with nested objects..." langTag="TS" />
          <FavoriteCard title="Debounce Hook" description="Custom React hook for input performance..." langTag="JS" />
          <FavoriteCard title="Worker Pool" description="Concurrent task execution manager..." langTag="GO" />
        </View>
      </ScrollView>

      <TouchableOpacity style={[styles.fab, { backgroundColor: theme.primary }]} onPress={() => router.push("/home/create")}>
        <Text style={[styles.fabIcon, { color: theme.switchThumb }]}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingHorizontal: 16,
    marginTop: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
  },
  sectionSubtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: "500",
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  gridContainer: {
    paddingHorizontal: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "space-between",
  },
  fab: {
    position: "absolute",
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 4 },
  },
  fabIcon: {
    fontSize: 28,
    fontWeight: "300",
  },
});
