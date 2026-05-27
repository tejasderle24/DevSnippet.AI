import React, { useMemo, useState } from "react";
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useAppData, setLastOpenedSnippet } from "@/context/AppDataContext";
import { explainCode } from "@/services/aiService";
import { exportSnippetToJson, exportSnippetToJs, exportSnippetToTxt, shareFile } from "@/services/fileSystemService";

export default function SnippetDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id?: string }>();
  const { snippets, deleteSnippet, saveManagedFile, setAILoading, aiLoading } = useAppData();
  const [aiText, setAIText] = useState("");
  const snippet = useMemo(() => snippets.find((s) => s.id === params.id), [snippets, params.id]);

  if (!snippet) {
    return <SafeAreaView style={styles.container}><Text style={styles.title}>Snippet not found.</Text></SafeAreaView>;
  }

  setLastOpenedSnippet(snippet.id).catch(() => undefined);

  const exportAndSave = async (kind: "txt" | "js" | "json") => {
    try {
      const file = kind === "txt" ? await exportSnippetToTxt(snippet) : kind === "js" ? await exportSnippetToJs(snippet) : await exportSnippetToJson(snippet);
      await saveManagedFile(file.name, file.uri, kind);
      await shareFile(file.uri);
    } catch (error) {
      Alert.alert("Export failed", (error as Error).message);
    }
  };

  const onExplain = async () => {
    setAILoading(true);
    try {
      const response = await explainCode(snippet);
      setAIText(response);
    } catch (error) {
      Alert.alert("AI failed", (error as Error).message);
    } finally {
      setAILoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}><Text style={styles.headerBtn}>Back</Text></TouchableOpacity>
        <Text style={styles.headerTitle}>Snippet</Text>
        <TouchableOpacity onPress={async () => { await deleteSnippet(snippet.id); router.back(); }}><Text style={styles.headerBtn}>Delete</Text></TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.body}>
        <Text style={styles.title}>{snippet.title}</Text>
        <Text style={styles.meta}>{snippet.language} - {snippet.tags.join(", ") || "No tags"}</Text>
        <View style={styles.codeCard}><Text style={styles.code}>{snippet.code}</Text></View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.btn} onPress={() => exportAndSave("txt")}><Text style={styles.btnText}>Export TXT</Text></TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => exportAndSave("js")}><Text style={styles.btnText}>Export JS</Text></TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => exportAndSave("json")}><Text style={styles.btnText}>Export JSON</Text></TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.aiBtn} onPress={onExplain} disabled={aiLoading}>
          <Text style={styles.aiBtnText}>{aiLoading ? "Generating..." : "Generate Explanation"}</Text>
        </TouchableOpacity>
        {aiText ? <View style={styles.aiCard}><Text style={styles.aiText}>{aiText}</Text></View> : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#09090b" },
  header: { height: 56, paddingHorizontal: 16, alignItems: "center", justifyContent: "space-between", flexDirection: "row" },
  headerTitle: { color: "#fff", fontWeight: "700" },
  headerBtn: { color: "#93b4ff" },
  body: { padding: 16, gap: 12 },
  title: { color: "#fff", fontSize: 22, fontWeight: "700" },
  meta: { color: "#aaa" },
  codeCard: { borderWidth: 1, borderColor: "#222", borderRadius: 10, backgroundColor: "#121214", padding: 12 },
  code: { color: "#a5b4fc", fontFamily: "monospace" },
  row: { flexDirection: "row", gap: 8 },
  btn: { flex: 1, backgroundColor: "#18181b", borderColor: "#27272a", borderWidth: 1, borderRadius: 10, alignItems: "center", paddingVertical: 10 },
  btnText: { color: "#ddd", fontSize: 12 },
  aiBtn: { backgroundColor: "#93b4ff", borderRadius: 10, alignItems: "center", paddingVertical: 12 },
  aiBtnText: { color: "#1e3a8a", fontWeight: "700" },
  aiCard: { borderRadius: 10, borderWidth: 1, borderColor: "#1e2638", backgroundColor: "#151922", padding: 12 },
  aiText: { color: "#d1d5db", lineHeight: 20 },
});
