import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useAppData } from "@/context/AppDataContext";
import { importSnippetFromFile } from "@/services/fileSystemService";

const languages = ["TypeScript", "JavaScript", "Python", "Go", "React", "Node"];

export default function CreateSnippet() {
  const router = useRouter();
  const { createSnippet } = useAppData();
  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState("TypeScript");
  const [code, setCode] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [saving, setSaving] = useState(false);

  const onSave = async () => {
    if (!title.trim() || !code.trim()) return Alert.alert("Missing fields", "Title and code are required.");
    setSaving(true);
    try {
      await createSnippet({
        title: title.trim(),
        code,
        language,
        tags: tagsInput.split(",").map((t) => t.trim()).filter(Boolean),
      });
      router.back();
    } catch (error) {
      Alert.alert("Save failed", (error as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const onImport = async () => {
    try {
      const imported = await importSnippetFromFile();
      if (!imported) return;
      setTitle(imported.title);
      setCode(imported.code);
      setLanguage(imported.language);
      setTagsInput(imported.tags.join(", "));
    } catch (error) {
      Alert.alert("Import failed", (error as Error).message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}><Text style={styles.back}>Back</Text></TouchableOpacity>
        <Text style={styles.title}>New Snippet</Text>
        <TouchableOpacity onPress={onSave} disabled={saving}><Text style={styles.save}>{saving ? "Saving..." : "Save"}</Text></TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.body}>
        <TextInput style={styles.input} placeholder="Snippet title" placeholderTextColor="#666" value={title} onChangeText={setTitle} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.langs}>
          {languages.map((item) => (
            <TouchableOpacity key={item} style={[styles.pill, language === item && styles.pillActive]} onPress={() => setLanguage(item)}>
              <Text style={[styles.pillText, language === item && styles.pillTextActive]}>{item}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <TextInput
          style={[styles.input, styles.code]}
          multiline
          placeholder="// Paste your code here..."
          placeholderTextColor="#666"
          value={code}
          onChangeText={setCode}
          autoCapitalize="none"
        />
        <TextInput style={styles.input} placeholder="tags: react, api, cache" placeholderTextColor="#666" value={tagsInput} onChangeText={setTagsInput} />
        <TouchableOpacity style={styles.attach} onPress={onImport}><Text style={styles.attachText}>Import from file</Text></TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#09090b" },
  header: { height: 56, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16 },
  back: { color: "#fff" },
  title: { color: "#fff", fontWeight: "700", fontSize: 18 },
  save: { color: "#93b4ff", fontWeight: "700" },
  body: { padding: 16, gap: 12 },
  input: { backgroundColor: "#121214", borderColor: "#222", borderWidth: 1, borderRadius: 10, color: "#fff", padding: 12 },
  code: { minHeight: 240, textAlignVertical: "top", fontFamily: "monospace" },
  langs: { gap: 8 },
  pill: { borderWidth: 1, borderColor: "#2d2d34", borderRadius: 999, paddingHorizontal: 12, paddingVertical: 8 },
  pillActive: { backgroundColor: "#93b4ff", borderColor: "#93b4ff" },
  pillText: { color: "#a0a0a5", fontSize: 12 },
  pillTextActive: { color: "#000" },
  attach: { backgroundColor: "#121214", borderRadius: 10, borderWidth: 1, borderColor: "#1e1e24", alignItems: "center", padding: 12 },
  attachText: { color: "#b4c6ff", fontWeight: "700" },
});
