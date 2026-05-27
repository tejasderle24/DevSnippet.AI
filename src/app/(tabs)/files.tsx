import { StatusBar } from "expo-status-bar";
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import Header from "@/components/common/Header";
import { useTheme } from "@/context/ThemeContext";

// Import your custom sub-components
import FileCategoryFilters from "@/components/files/FileCategoryFilters";
import RecentScreenshots from "@/components/files/RecentScreenshots";
import FileItemCard from "@/components/files/FileItemCard";

const CODE_FILES_DATA = [
  {
    id: "1",
    filename: "config.json",
    meta: "Modified 2h ago  •  1.2 KB",
    preview: `{ "version": "2.4.0", "theme": "navy-glass", ... }`,
    icon: "code-braces" as const,
    iconColor: "#4ade80", // Greenish Tint
  },
  {
    id: "2",
    filename: "api-handler.js",
    meta: "Modified 4h ago  •  4.5 KB",
    preview: `export const fetchSnippets = async () => { ... }`,
    icon: "language-javascript" as const,
    iconColor: "#f43f5e", // Pinkish Tint
  },
  {
    id: "3",
    filename: "README.txt",
    meta: "Modified Yesterday  •  0.8 KB",
    preview: `Project documentation for the AI Snippets engine.`,
    icon: "file-text-outline" as const,
    iconColor: "#a1a1aa", // Gray Tint
  }
];

export default function FilesScreen() {
  const { theme, isDarkMode } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background || "#0e0e11" }]}>
      <StatusBar style={isDarkMode ? "light" : "dark"} />
      
      {/* TopHeader */}
      <Header />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Category Pill Filters */}
        <FileCategoryFilters />

        {/* Horizontal Screenshots Carousel Section */}
        <RecentScreenshots />

        {/* Vertical Code Files Section */}
        <View style={styles.codeFilesSection}>
          <Text style={styles.sectionTitle}>Code Files</Text>
          
          {CODE_FILES_DATA.map((file) => (
            <FileItemCard
              key={file.id}
              filename={file.filename}
              meta={file.meta}
              preview={file.preview}
              icon={file.icon}
              iconColor={file.iconColor}
            />
          ))}
        </View>

        {/* Upload Action Target Block */}
        <TouchableOpacity activeOpacity={0.7} style={styles.uploadContainer}>
          <Feather name="upload-cloud" size={24} color="#a1a1aa" style={styles.uploadIcon} />
          <Text style={styles.uploadText}>UPLOAD NEW FILE</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  codeFilesSection: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 16,
  },
  uploadContainer: {
    marginHorizontal: 16,
    height: 100,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "#232329",
    borderStyle: "dashed", // Implements dashed layout outline
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121214",
  },
  uploadIcon: {
    marginBottom: 6,
  },
  uploadText: {
    color: "#a1a1aa",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
  },
});