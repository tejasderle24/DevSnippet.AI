import SnippetCard from "@/components/common/SnippetCard";
import { useTheme } from "@/context/ThemeContext";
import { getAllSnippets, initSnippetDb, searchSnippets } from "@/lib/snippets-db";
import { getTimeAgo } from "@/lib/time";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ViewAllScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [snippets, setSnippets] = useState<
    { id: string; title: string; code: string; tags: string[]; timeAgo: string; isFavorite: boolean }[]
  >([]);

  const mapSnippets = useCallback(
    (items: Awaited<ReturnType<typeof getAllSnippets>>) =>
      items.map((item) => ({
        id: String(item.id),
        title: item.title,
        code: item.code,
        tags: item.tags.length ? item.tags : [item.language.toUpperCase()],
        timeAgo: getTimeAgo(item.updatedAt),
        isFavorite: item.isFavorite,
      })),
    []
  );

  const loadSnippets = useCallback(async () => {
    await initSnippetDb();
    const data = searchQuery.trim() ? await searchSnippets(searchQuery) : await getAllSnippets();
    setSnippets(mapSnippets(data));
  }, [mapSnippets, searchQuery]);

  useFocusEffect(
    useCallback(() => {
      void loadSnippets();
    }, [loadSnippets])
  );

  const handleSearchChange = async (value: string) => {
    setSearchQuery(value);
    const data = value.trim() ? await searchSnippets(value) : await getAllSnippets();
    setSnippets(mapSnippets(data));
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { borderBottomColor: theme.border }]}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={[styles.backIcon, { color: theme.text }]}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>All Snippets</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search snippets..."
          placeholderTextColor={theme.subText}
          style={[styles.searchInput, { backgroundColor: theme.input, borderColor: theme.border, color: theme.text }]}
          value={searchQuery}
          onChangeText={handleSearchChange}
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.listContainer}>
          {snippets.length > 0 ? (
            snippets.map((item) => (
              <SnippetCard
                key={item.id}
                id={item.id}
                title={item.title}
                timeAgo={item.timeAgo}
                code={item.code}
                tags={item.tags}
                isFavorite={item.isFavorite}
              />
            ))
          ) : (
            <Text style={[styles.emptyText, { color: theme.subText }]}>No snippets found matching your search.</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  backIcon: {
    fontSize: 24,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInput: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  listContainer: {
    paddingHorizontal: 16,
    marginTop: 8,
  },
  emptyText: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 40,
  },
});
