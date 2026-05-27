import Header from "@/components/common/Header";
import { useTheme } from "@/context/ThemeContext";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Import our new components
import SnippetCard from "@/components/common/SnippetCard";
import FavoriteCard from "@/components/home/FavoriteCard";
import LanguageFilters from "@/components/home/LanguageFilters";

export default function HomeScreen() {
  const { theme, isDarkMode } = useTheme();

  const router = useRouter();

  // Dummy dataset representing code from the design mockup
  const mockSnippets = [
    {
      id: "1",
      filename: "AuthMiddleware.ts",
      title: "Next.js Edge Auth",
      timeAgo: "2h ago",
      code: "export const middleware = (req: NextReq...\n  const token = req.cookies.get('auth')\n  return NextResponse.next();\n};"
    },
    {
      id: "2",
      filename: "styles.css",
      title: "Modern Frosted Glass",
      timeAgo: "5h ago",
      code: ".glass-effect {\n  backdrop-filter: blur(12px);\n  background: rgba(255, 255, 255, 0.1);\n}"
    }
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background || "#09090b" }]}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      <Header />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* Language Selection Filter Bar */}
        <LanguageFilters />

        {/* Recent Snippets Section */}
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Recent Snippets</Text>
            <Text style={styles.sectionSubtitle}>Your latest architectural blocks</Text>
          </View>
          <TouchableOpacity onPress={() => router.push("/home/view-all")}>
            <Text style={styles.viewAllText}>View All →</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.listContainer}>
          {mockSnippets.map((item) => (
            <SnippetCard
              key={item.id}
              filename={item.filename}
              title={item.title}
              timeAgo={item.timeAgo}
              code={item.code}
            />
          ))}
        </View>

        {/* Favorites Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Favorites</Text>
        </View>

        {/* Grid System for Favorites */}
        <View style={styles.gridContainer}>
          <FavoriteCard
            title="Data Fetcher"
            description="Efficient async request handler using aiohttp..."
            langTag="PY"
          />
          <FavoriteCard
            title="Zod Schema"
            description="User validation schema with nested objects..."
            langTag="TS"
          />
          <FavoriteCard
            title="Debounce Hook"
            description="Custom React hook for input performance..."
            langTag="JS"
          />
          <FavoriteCard
            title="Worker Pool"
            description="Concurrent task execution manag..."
            langTag="GO"
          />
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("/home/create")}
      >
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100, // Padding keeps content visible under FAB & navigation
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
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "bold",
  },
  sectionSubtitle: {
    color: "#71717a",
    fontSize: 13,
    marginTop: 2,
  },
  viewAllText: {
    color: "#93b4ff",
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
    backgroundColor: "#b4c6ff",
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 4 },
  },
  fabIcon: {
    color: "#121214",
    fontSize: 28,
    fontWeight: "300",
  },
});