import React, { useMemo, useState } from "react";
import { StyleSheet, View, Text, ScrollView, TextInput, TouchableOpacity, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useTheme } from "@/context/ThemeContext";
import SnippetCard from "@/components/home/SnippetCard";
import { useAppData } from "@/context/AppDataContext";
import { toRelativeTime } from "@/lib/utils";

export default function ViewAllScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const { snippets, loading, refresh, toggleFavorite } = useAppData();
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return snippets;
    return snippets.filter((s) => [s.title, s.code, s.language, s.tags.join(" ")].join(" ").toLowerCase().includes(q));
  }, [searchQuery, snippets]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background || "#09090b" }]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}><Text style={styles.backIcon}>Back</Text></TouchableOpacity>
        <Text style={styles.headerTitle}>All Snippets</Text>
        <View style={{ width: 40 }} />
      </View>
      <View style={styles.searchContainer}>
        <TextInput placeholder="Search snippets..." placeholderTextColor="#71717a" style={styles.searchInput} value={searchQuery} onChangeText={setSearchQuery} />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent} refreshControl={<RefreshControl refreshing={loading} onRefresh={refresh} />}>
        <View style={styles.listContainer}>
          {filtered.length > 0 ? filtered.map((item) => (
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
          )) : <Text style={styles.emptyText}>No snippets found matching your search.</Text>}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: "#1e1e24" },
  backButton: { width: 40, height: 40, justifyContent: "center", alignItems: "flex-start" },
  backIcon: { color: "#ffffff", fontSize: 14 },
  headerTitle: { color: "#ffffff", fontSize: 18, fontWeight: "bold" },
  searchContainer: { paddingHorizontal: 16, paddingVertical: 12 },
  searchInput: { backgroundColor: "#121214", borderWidth: 1, borderColor: "#232329", borderRadius: 10, paddingHorizontal: 14, paddingVertical: 10, color: "#ffffff", fontSize: 14 },
  scrollContent: { paddingBottom: 40 },
  listContainer: { paddingHorizontal: 16, marginTop: 8 },
  emptyText: { color: "#71717a", fontSize: 14, textAlign: "center", marginTop: 40 },
});
