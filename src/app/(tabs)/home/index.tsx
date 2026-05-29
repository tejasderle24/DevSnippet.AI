import Header from "@/components/common/Header";
import SnippetCard from "@/components/common/SnippetCard";
import FavoriteCard from "@/components/home/FavoriteCard";
import LanguageFilters from "@/components/home/LanguageFilters";
import { useTheme } from "@/context/ThemeContext";
import { getAllSnippets, getFavoriteSnippets, initSnippetDb } from "@/lib/snippets-db";
import { getTimeAgo } from "@/lib/time";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";

export default function HomeScreen() {
  const { theme, isDarkMode } = useTheme();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("ALL");
  const [allSnippets, setAllSnippets] = useState<
    { id: string; title: string; code: string; tags: string[]; timeAgo: string; isFavorite: boolean; language: string }[]
  >([]);
  const [snippets, setSnippets] = useState<
    { id: string; title: string; code: string; tags: string[]; timeAgo: string; isFavorite: boolean }[]
  >([]);
  const [favoriteCards, setFavoriteCards] = useState<{ id: string; title: string; langTag: string }[]>([]);

  const applyFilters = useCallback(
    (source: { id: string; title: string; code: string; tags: string[]; timeAgo: string; isFavorite: boolean; language: string }[]) => {
      const q = searchQuery.trim().toLowerCase();
      const filtered = source.filter((item) => {
        const languageOk = selectedLanguage === "ALL" || item.language.toUpperCase() === selectedLanguage;
        if (!languageOk) return false;
        if (!q) return true;
        return (
          item.title.toLowerCase().includes(q) ||
          item.code.toLowerCase().includes(q) ||
          item.tags.some((tag) => tag.toLowerCase().includes(q))
        );
      });
      setSnippets(filtered.slice(0, 5));
    },
    [searchQuery, selectedLanguage]
  );

  const loadRecent = useCallback(async () => {
    await initSnippetDb();
    const all = await getAllSnippets();
    const mapped = all.map((item) => ({
      id: String(item.id),
      title: item.title,
      code: item.code,
      tags: item.tags.length ? item.tags : [item.language.toUpperCase()],
      timeAgo: getTimeAgo(item.updatedAt),
      isFavorite: item.isFavorite,
      language: item.language,
    }));
    setAllSnippets(mapped);
    applyFilters(mapped);

    const favorites = await getFavoriteSnippets();
    setFavoriteCards(
      favorites.slice(0, 4).map((item) => ({
        id: String(item.id),
        title: item.title,
        langTag: (item.tags[0] || item.language).toUpperCase(),
      }))
    );
  }, [applyFilters]);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    const q = value.trim().toLowerCase();
    const filtered = allSnippets.filter((item) => {
      const languageOk = selectedLanguage === "ALL" || item.language.toUpperCase() === selectedLanguage;
      if (!languageOk) return false;
      if (!q) return true;
      return item.title.toLowerCase().includes(q) || item.code.toLowerCase().includes(q) || item.tags.some((tag) => tag.toLowerCase().includes(q));
    });
    setSnippets(filtered.slice(0, 5));
  };

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    const q = searchQuery.trim().toLowerCase();
    const filtered = allSnippets.filter((item) => {
      const languageOk = language === "ALL" || item.language.toUpperCase() === language;
      if (!languageOk) return false;
      if (!q) return true;
      return item.title.toLowerCase().includes(q) || item.code.toLowerCase().includes(q) || item.tags.some((tag) => tag.toLowerCase().includes(q));
    });
    setSnippets(filtered.slice(0, 5));
  };

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
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search recent snippets..."
            placeholderTextColor={theme.subText}
            style={[styles.searchInput, { backgroundColor: theme.input, borderColor: theme.border, color: theme.text }]}
            value={searchQuery}
            onChangeText={handleSearchChange}
          />
        </View>

        <LanguageFilters selected={selectedLanguage} onSelect={handleLanguageChange} />

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
          {favoriteCards.map((item) => (
            <FavoriteCard key={item.id} title={item.title} langTag={item.langTag} />
          ))}
          {favoriteCards.length === 0 && <Text style={{ color: theme.subText }}>No favorites yet.</Text>}
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
  searchContainer: {
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  searchInput: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
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
