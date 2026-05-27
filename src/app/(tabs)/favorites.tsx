import { StatusBar } from "expo-status-bar";
import { StyleSheet, FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/common/Header";
import SnippetCard from "@/components/common/SnippetCard"; // Adjust this path to your file structure
import { useTheme } from "@/context/ThemeContext";

// Dummy data mirroring your image upload
const FAVORITE_SNIPPETS = [
  {
    id: "1",
    title: "Tailwind Config",
    code: `module.exports = {\n  theme: {\n    extend: {\n      colors: {\n        'brand': '#adc6ff'\n      }\n    }\n  }\n}`,
    timeAgo: "2h ago",
    tags: ["JAVASCRIPT"],
  },
  {
    id: "2",
    title: "Auth Middleware",
    code: `def check_auth(token):\n  if not token:\n    raise AuthError(401)\n  return decode(token)`,
    timeAgo: "Yesterday",
    tags: ["PYTHON"],
  },
  {
    id: "3",
    title: "React Portal",
    code: `createPortal(\n  <Modal />,\n  document.body\n)`,
    timeAgo: "3d ago",
    tags: ["REACT"],
  },
];

export default function FavoritesScreen() {
  const { theme, isDarkMode } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background || "#0e0e11" }]}>
      <StatusBar style={isDarkMode ? "light" : "dark"} />
      
      {/* Top Header */}
      <Header />

      {/* Snippet List */}
      <FlatList
        data={FAVORITE_SNIPPETS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <SnippetCard
            id={item.id}
            title={item.title}
            code={item.code}
            timeAgo={item.timeAgo}
            tags={item.tags}
            isFavorite={true}
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
    paddingBottom: 30, // Extra space at bottom for comfortable scrolling above tabs
  },
});