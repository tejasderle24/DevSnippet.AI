import { StatusBar } from "expo-status-bar";
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/common/Header";
import { useTheme } from "@/context/ThemeContext";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { useAppData } from "@/context/AppDataContext";
import { toRelativeTime } from "@/lib/utils";
import LanguageFilters from "@/components/home/LanguageFilters";
import SnippetCard from "@/components/home/SnippetCard";
import FavoriteCard from "@/components/home/FavoriteCard";

export default function HomeScreen() {
  const { theme, isDarkMode } = useTheme();
  const router = useRouter();
  const { snippets, loading, refresh, toggleFavorite } = useAppData();
  const [selectedLanguage, setSelectedLanguage] = useState("ALL LANGUAGES");

  const filtered = useMemo(() => {
    if (selectedLanguage === "ALL LANGUAGES") return snippets;
    return snippets.filter((s) => s.language.toLowerCase() === selectedLanguage.toLowerCase());
  }, [selectedLanguage, snippets]);

  const recentSnippets = filtered.slice(0, 8);
  const favorites = snippets.filter((s) => s.isFavorite).slice(0, 4);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background || "#09090b" }]}>
      <StatusBar style={isDarkMode ? "light" : "dark"} />
      <Header />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={refresh} />}
      >
        <LanguageFilters selectedLanguage={selectedLanguage} onSelectLanguage={setSelectedLanguage} />
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Recent Snippets</Text>
            <Text style={styles.sectionSubtitle}>Your latest architectural blocks</Text>
          </View>
          <TouchableOpacity onPress={() => router.push("/home/view-all")}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.listContainer}>
          {recentSnippets.map((item) => (
            <SnippetCard
              key={item.id}
              id={item.id}
              filename={`${item.title}.${item.language.slice(0, 2).toLowerCase()}`}
              title={item.title}
              timeAgo={toRelativeTime(item.updatedAt)}
              code={item.code}
              tags={item.tags}
              isFavorite={item.isFavorite}
              onToggleFavorite={toggleFavorite}
            />
          ))}
          {!loading && recentSnippets.length === 0 ? <Text style={styles.sectionSubtitle}>No snippets yet.</Text> : null}
        </View>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Favorites</Text>
        </View>
        <View style={styles.gridContainer}>
          {favorites.map((item) => (
            <FavoriteCard key={item.id} title={item.title} description={item.code} langTag={item.language.slice(0, 2).toUpperCase()} />
          ))}
          {!loading && favorites.length === 0 ? <Text style={styles.sectionSubtitle}>No favorites yet.</Text> : null}
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.fab} onPress={() => router.push("/home/create")}>
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingBottom: 100 },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", paddingHorizontal: 16, marginTop: 20, marginBottom: 12 },
  sectionTitle: { color: "#ffffff", fontSize: 22, fontWeight: "bold" },
  sectionSubtitle: { color: "#71717a", fontSize: 13, marginTop: 2 },
  viewAllText: { color: "#93b4ff", fontSize: 14, fontWeight: "500" },
  listContainer: { paddingHorizontal: 16 },
  gridContainer: { paddingHorizontal: 16, flexDirection: "row", flexWrap: "wrap", gap: 12, justifyContent: "space-between" },
  fab: {
    position: "absolute",
    bottom: 24,
    right: 24,
    backgroundColor: "#b4c6ff",
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  fabIcon: { color: "#121214", fontSize: 28, fontWeight: "300" },
});
