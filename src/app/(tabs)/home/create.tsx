import { useTheme } from "@/context/ThemeContext";
import { createSnippet, getSnippetById, initSnippetDb, updateSnippet } from "@/lib/snippets-db";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CreateSnippet() {
  const { theme, isDarkMode } = useTheme();
  const router = useRouter();
  const params = useLocalSearchParams();
  const editId = params.id ? Number(params.id) : null;

  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("TypeScript");
  const [showLanguages, setShowLanguages] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const languages = useMemo(() => ["TypeScript", "JavaScript", "Python", "Go", "React", "Node"], []);

  useEffect(() => {
    const loadSnippet = async () => {
      if (!editId || Number.isNaN(editId)) return;
      await initSnippetDb();
      const snippet = await getSnippetById(editId);
      if (!snippet) return;
      setTitle(snippet.title);
      setCode(snippet.code);
      setTags(snippet.tags);
      setSelectedLanguage(snippet.language);
    };
    void loadSnippet();
  }, [editId]);

  const getTabFilename = (lang: string): string => {
    switch (lang) {
      case "TypeScript":
        return "MAIN.TS";
      case "JavaScript":
        return "MAIN.JS";
      case "Python":
        return "MAIN.PY";
      case "Go":
        return "MAIN.GO";
      case "React":
        return "INDEX.JSX";
      case "Node":
        return "APP.JS";
      default:
        return "MAIN.TXT";
    }
  };

  const handleAddTag = () => {
    const cleaned = tagInput.trim();
    if (!cleaned) return;
    if (tags.includes(cleaned)) {
      setTagInput("");
      return;
    }
    setTags([...tags, cleaned]);
    setTagInput("");
  };

  const handleSave = async () => {
    if (!title.trim() || !code.trim()) {
      Alert.alert("Missing fields", "Please enter both a snippet title and code.");
      return;
    }

    setIsSaving(true);
    try {
      if (editId && !Number.isNaN(editId)) {
        await updateSnippet(editId, { title, code, language: selectedLanguage, tags });
      } else {
        await createSnippet({ title, code, language: selectedLanguage, tags });
      }
      router.back();
    } catch {
      Alert.alert("Save failed", "Could not save snippet. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={[styles.backIcon, { color: theme.text }]}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>{editId ? "Edit Snippet" : "New Snippet"}</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={[styles.cancelBtn, { color: theme.subText }]}>CANCEL</Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollPadding}>
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.mutedText }]}>SNIPPET TITLE</Text>
            <TextInput
              placeholder="e.g. Fetch API Wrapper"
              placeholderTextColor={theme.mutedText}
              style={[styles.textInput, { backgroundColor: theme.input, borderColor: theme.border, color: theme.text }]}
              value={title}
              onChangeText={setTitle}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.mutedText }]}>LANGUAGE</Text>
            <TouchableOpacity
              style={[styles.dropdown, { backgroundColor: theme.input, borderColor: theme.border }]}
              onPress={() => setShowLanguages(!showLanguages)}
            >
              <Text style={[styles.dropdownText, { color: theme.text }]}>{selectedLanguage}</Text>
              <Ionicons name={showLanguages ? "chevron-up" : "chevron-down"} size={18} color={theme.subText} />
            </TouchableOpacity>

            {showLanguages && (
              <View style={[styles.languageDropdown, { backgroundColor: theme.card, borderColor: theme.border }]}>
                {languages.map((lang) => (
                  <TouchableOpacity
                    key={lang}
                    style={[styles.languageItem, { borderBottomColor: theme.border }]}
                    onPress={() => {
                      setSelectedLanguage(lang);
                      setShowLanguages(false);
                    }}
                  >
                    <Text style={[styles.languageItemText, { color: theme.text }]}>{lang}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.mutedText }]}>CODE SOURCE</Text>
            <View style={[styles.editorWindow, { backgroundColor: theme.card, borderColor: theme.border }]}>
              <View style={[styles.editorHeader, { backgroundColor: theme.cardAlt, borderBottomColor: theme.border }]}>
                <View style={styles.dots}>
                  <View style={[styles.dot, { backgroundColor: "#ef4444" }]} />
                  <View style={[styles.dot, { backgroundColor: "#eab308" }]} />
                  <View style={[styles.dot, { backgroundColor: "#22c55e" }]} />
                </View>
                <View style={[styles.tab, { borderBottomColor: theme.primary }]}>
                  <Text style={[styles.tabText, { color: theme.text }]}>{getTabFilename(selectedLanguage)}</Text>
                </View>
              </View>
              <View style={styles.editorBody}>
                <View style={styles.lineNumbers}>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((n) => (
                    <Text key={n} style={[styles.lineNumberText, { color: theme.mutedText }]}>
                      {n}
                    </Text>
                  ))}
                </View>
                <TextInput
                  multiline
                  style={[styles.codeContent, { color: isDarkMode ? "#a5b4fc" : "#4338ca" }]}
                  placeholder="// Paste your code here..."
                  placeholderTextColor={theme.mutedText}
                  spellCheck={false}
                  autoCorrect={false}
                  autoCapitalize="none"
                  value={code}
                  onChangeText={setCode}
                />
              </View>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.mutedText }]}>TAGS</Text>
            <View style={[styles.tagContainer, { backgroundColor: theme.input, borderColor: theme.border }]}>
              {tags.map((tag, index) => (
                <View key={`${tag}-${index}`} style={[styles.tag, { backgroundColor: theme.cardAlt }]}>
                  <Text style={[styles.tagText, { color: theme.subText }]}>{tag}</Text>
                  <TouchableOpacity onPress={() => setTags(tags.filter((_, i) => i !== index))}>
                    <Ionicons name="close" size={14} color={theme.subText} />
                  </TouchableOpacity>
                </View>
              ))}

              <View style={styles.inlineInputWrapper}>
                <TextInput
                  placeholder="Add tag..."
                  placeholderTextColor={theme.mutedText}
                  style={[styles.addTagInput, { color: theme.text }]}
                  value={tagInput}
                  onChangeText={setTagInput}
                  onSubmitEditing={handleAddTag}
                  returnKeyType="done"
                />
                {tagInput.trim().length > 0 && (
                  <TouchableOpacity style={[styles.smallAddBtn, { backgroundColor: theme.primary }]} onPress={handleAddTag}>
                    <Ionicons name="add" size={16} color={theme.switchThumb} />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>

          <View style={[styles.banner, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <View style={[styles.bannerIcon, { backgroundColor: theme.cardAlt }]}>
              <MaterialCommunityIcons name="database" size={20} color={theme.primary} />
            </View>
            <View style={styles.bannerTextContainer}>
              <Text style={[styles.bannerTitle, { color: theme.text }]}>Stored Locally</Text>
              <Text style={[styles.bannerSub, { color: theme.subText }]}>
                Snippets are saved to your local SQLite database and available offline.
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={[styles.footer, { borderTopColor: theme.border }]}>
        <TouchableOpacity
          style={[styles.saveBtn, { backgroundColor: theme.primary, opacity: isSaving ? 0.6 : 1 }]}
          onPress={handleSave}
          disabled={isSaving}
        >
          <MaterialCommunityIcons name="content-save-outline" size={22} color={theme.switchThumb} />
          <Text style={[styles.saveBtnText, { color: theme.switchThumb }]}>{isSaving ? "Saving..." : "Save Snippet"}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    height: 60,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  backIcon: { fontSize: 24 },
  cancelBtn: { fontWeight: "600", fontSize: 12 },
  headerTitle: { fontSize: 18, fontWeight: "bold" },
  scrollPadding: { paddingHorizontal: 20, paddingBottom: 40 },
  inputGroup: { marginTop: 24 },
  label: { fontSize: 11, fontWeight: "bold", marginBottom: 8, letterSpacing: 1 },
  textInput: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 16,
    fontSize: 15,
  },
  dropdown: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropdownText: { fontSize: 15 },
  languageDropdown: {
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 8,
    overflow: "hidden",
  },
  languageItem: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  languageItemText: { fontSize: 14 },
  editorWindow: {
    borderWidth: 1,
    borderRadius: 12,
    overflow: "hidden",
  },
  editorHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    height: 40,
    borderBottomWidth: 1,
  },
  dots: { flexDirection: "row", gap: 6 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  tab: {
    marginLeft: 20,
    paddingHorizontal: 12,
    height: "100%",
    justifyContent: "center",
    borderBottomWidth: 2,
  },
  tabText: { fontSize: 10, fontWeight: "bold" },
  editorBody: { flexDirection: "row", minHeight: 250, padding: 12 },
  lineNumbers: { width: 25, marginRight: 10 },
  lineNumberText: { fontSize: 12, lineHeight: 20, textAlign: "right" },
  codeContent: {
    flex: 1,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    fontSize: 14,
    textAlignVertical: "top",
    lineHeight: 20,
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    borderWidth: 1,
    borderRadius: 10,
    padding: 8,
    gap: 8,
    alignItems: "center",
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    gap: 6,
  },
  tagText: { fontSize: 13 },
  inlineInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    minWidth: 120,
  },
  addTagInput: {
    fontSize: 13,
    flex: 1,
    paddingLeft: 8,
    height: 32,
  },
  smallAddBtn: {
    width: 24,
    height: 24,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 6,
  },
  banner: {
    flexDirection: "row",
    marginTop: 20,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    gap: 16,
  },
  bannerIcon: { width: 40, height: 40, borderRadius: 10, justifyContent: "center", alignItems: "center" },
  bannerTextContainer: { flex: 1 },
  bannerTitle: { fontSize: 14, fontWeight: "bold", marginBottom: 4 },
  bannerSub: { fontSize: 12, lineHeight: 16 },
  footer: {
    padding: 20,
    borderTopWidth: 1,
  },
  saveBtn: {
    height: 56,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  saveBtnText: { fontSize: 16, fontWeight: "bold" },
});

