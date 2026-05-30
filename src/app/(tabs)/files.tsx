import { useCallback, useMemo, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Alert, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import * as Sharing from "expo-sharing";
import Header from "@/components/common/Header";
import { useTheme } from "@/context/ThemeContext";
import FileCategoryFilters from "@/components/files/FileCategoryFilters";
import RecentScreenshots from "@/components/files/RecentScreenshots";
import FileItemCard from "@/components/files/FileItemCard";
import {
  attachScreenshotFromPicker,
  deleteStoredFile,
  downloadTemplateResource,
  formatBytes,
  getCategory,
  getResourceTemplates,
  listStoredFiles,
  saveSnippetsAsLocalCodeFiles,
  type StoredFileItem,
} from "@/lib/local-files";

function iconForFile(file: StoredFileItem): keyof typeof MaterialCommunityIcons.glyphMap {
  if (file.category === "image") return "image";
  if (file.category === "doc") return "file-document-outline";
  if (file.category === "audio") return "music-note";
  if (file.category === "code") {
    if (file.extension === "ts" || file.extension === "tsx") return "language-typescript";
    if (file.extension === "js" || file.extension === "jsx") return "language-javascript";
    if (file.extension === "py") return "language-python";
    if (file.extension === "go") return "language-go";
    return "code-braces";
  }
  return "file-outline";
}

function tintForFile(file: StoredFileItem) {
  if (file.category === "image") return "#22d3ee";
  if (file.category === "doc") return "#f59e0b";
  if (file.category === "audio") return "#fb7185";
  if (file.category === "code") return "#4ade80";
  return "#a1a1aa";
}

function fileMeta(file: StoredFileItem) {
  const modified = new Date(file.modifiedAt).toLocaleString();
  return `Modified ${modified}  •  ${formatBytes(file.size)}`;
}

function previewFromName(file: StoredFileItem) {
  return `${file.name}\n${file.uri}`;
}

export default function FilesScreen() {
  const { theme, isDarkMode } = useTheme();
  const [files, setFiles] = useState<StoredFileItem[]>([]);
  const [activeCategory, setActiveCategory] = useState("ALL FILES");
  const [isBusy, setIsBusy] = useState(false);

  const loadFiles = useCallback(async () => {
    const stored = await listStoredFiles();
    setFiles(stored);
  }, []);

  useFocusEffect(
    useCallback(() => {
      void loadFiles();
    }, [loadFiles])
  );

  const visibleFiles = useMemo(() => {
    if (activeCategory === "ALL FILES") return files;
    return files.filter((file) => {
      if (activeCategory === "IMAGES") return file.category === "image";
      if (activeCategory === "DOCS") return file.category === "doc";
      if (activeCategory === "CODE") return file.category === "code";
      if (activeCategory === "AUDIO") return file.category === "audio";
      return true;
    });
  }, [activeCategory, files]);

  const screenshots = useMemo(
    () =>
      files
        .filter((file) => getCategory(file.name) === "image")
        .slice(0, 10)
        .map((file) => ({ id: file.uri, name: file.name, uri: file.uri })),
    [files]
  );

  const handleAttachScreenshot = async () => {
    try {
      setIsBusy(true);
      await attachScreenshotFromPicker();
      await loadFiles();
      Alert.alert("Attached", "Screenshot has been added to local storage.");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Could not attach screenshot.";
      Alert.alert("Attach failed", message);
    } finally {
      setIsBusy(false);
    }
  };

  const handleSaveSnippets = async () => {
    try {
      setIsBusy(true);
      const count = await saveSnippetsAsLocalCodeFiles();
      await loadFiles();
      Alert.alert("Saved", `${count} snippet file(s) saved locally.`);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Could not save snippets.";
      Alert.alert("Save failed", message);
    } finally {
      setIsBusy(false);
    }
  };

  const handleDownloadResource = async () => {
    const templates = getResourceTemplates();
    Alert.alert(
      "Download Template/Resource",
      "Pick a downloadable resource",
      [
        { text: "Cancel", style: "cancel" },
        ...templates.map((item) => ({
          text: item.label,
          onPress: async () => {
            try {
              setIsBusy(true);
              await downloadTemplateResource(item.url, item.name);
              await loadFiles();
              Alert.alert("Downloaded", `${item.name} saved locally.`);
            } catch (error) {
              const message = error instanceof Error ? error.message : "Could not download resource.";
              Alert.alert("Download failed", message);
            } finally {
              setIsBusy(false);
            }
          },
        })),
      ],
      { cancelable: true }
    );
  };

  const handleShareFile = async (file: StoredFileItem) => {
    const canShare = await Sharing.isAvailableAsync();
    if (canShare) {
      await Sharing.shareAsync(file.uri, { dialogTitle: file.name });
      return;
    }
    await Linking.openURL(file.uri);
  };

  const handleDeleteFile = (file: StoredFileItem) => {
    Alert.alert("Delete file", `Delete ${file.name}?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          await deleteStoredFile(file.uri);
          await loadFiles();
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background || "#0e0e11" }]}>
      <StatusBar style={isDarkMode ? "light" : "dark"} />
      <Header />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <FileCategoryFilters onChange={setActiveCategory} />
        <RecentScreenshots screenshots={screenshots} onViewAll={() => setActiveCategory("IMAGES")} />

        <View style={styles.codeFilesSection}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Stored Files</Text>
          {visibleFiles.map((file) => (
            <FileItemCard
              key={file.uri}
              filename={file.name}
              meta={fileMeta(file)}
              preview={previewFromName(file)}
              icon={iconForFile(file)}
              iconColor={tintForFile(file)}
              onDownload={() => Linking.openURL(file.uri)}
              onShare={() => void handleShareFile(file)}
              onDelete={() => handleDeleteFile(file)}
            />
          ))}
          {visibleFiles.length === 0 && <Text style={{ color: theme.subText }}>No files in this category yet.</Text>}
        </View>

        <View style={styles.ctaGrid}>
          <TouchableOpacity
            activeOpacity={0.7}
            disabled={isBusy}
            onPress={() => void handleAttachScreenshot()}
            style={[styles.uploadContainer, { borderColor: theme.border, backgroundColor: theme.card }]}
          >
            <Feather name="image" size={22} color={theme.subText} style={styles.uploadIcon} />
            <Text style={[styles.uploadText, { color: theme.subText }]}>ATTACH SCREENSHOT</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            disabled={isBusy}
            onPress={() => void handleSaveSnippets()}
            style={[styles.uploadContainer, { borderColor: theme.border, backgroundColor: theme.card }]}
          >
            <Feather name="code" size={22} color={theme.subText} style={styles.uploadIcon} />
            <Text style={[styles.uploadText, { color: theme.subText }]}>SAVE SNIPPETS AS FILES</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            disabled={isBusy}
            onPress={() => void handleDownloadResource()}
            style={[styles.uploadContainer, { borderColor: theme.border, backgroundColor: theme.card }]}
          >
            <Feather name="download-cloud" size={22} color={theme.subText} style={styles.uploadIcon} />
            <Text style={[styles.uploadText, { color: theme.subText }]}>DOWNLOAD RESOURCES</Text>
          </TouchableOpacity>
        </View>
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
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 16,
  },
  ctaGrid: {
    paddingHorizontal: 16,
    gap: 12,
  },
  uploadContainer: {
    height: 88,
    borderRadius: 14,
    borderWidth: 1.5,
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
  },
  uploadIcon: {
    marginBottom: 6,
  },
  uploadText: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
  },
});
