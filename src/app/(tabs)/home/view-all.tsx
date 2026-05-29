import SnippetCard from "@/components/common/SnippetCard";
import { useTheme } from "@/context/ThemeContext";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ALL_SNIPPETS = [
  {
    id: "1",
    title: "Next.js Edge Auth",
    timeAgo: "2h ago",
    code: "export const middleware = (req: NextReq...\\n  const token = req.cookies.get('auth')\\n  return NextResponse.next();\\n};",
    tags: ["TYPESCRIPT"],
  },
  {
    id: "2",
    title: "Modern Frosted Glass",
    timeAgo: "5h ago",
    code: ".glass-effect {\\n  backdrop-filter: blur(12px);\\n  background: rgba(255, 255, 255, 0.1);\\n}",
    tags: ["CSS"],
  },
  {
    id: "3",
    title: "Async Data Fetcher",
    timeAgo: "1 day ago",
    code: "import aiohttp\\nimport asyncio\\n\\nasync def fetch(session, url):\\n    async with session.get(url) as response:\\n        return await response.json()",
    tags: ["PYTHON"],
  },
  {
    id: "4",
    title: "Custom React Debounce Hook",
    timeAgo: "3 days ago",
    code: "function useDebounce(value, delay) {\\n  const [debouncedValue, setDebouncedValue] = useState(value);\\n  // hook implementation...\\n}",
    tags: ["JAVASCRIPT"],
  },
];

export default function ViewAllScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSnippets = ALL_SNIPPETS.filter((snippet) => snippet.title.toLowerCase().includes(searchQuery.toLowerCase()));

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
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.listContainer}>
          {filteredSnippets.length > 0 ? (
            filteredSnippets.map((item) => (
              <SnippetCard key={item.id} id={item.id} title={item.title} timeAgo={item.timeAgo} code={item.code} tags={item.tags} />
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
