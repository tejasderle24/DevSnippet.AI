import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView, TextInput, Switch, TouchableOpacity, Alert } from "react-native";
import Header from "@/components/common/Header";
import { useTheme } from "@/context/ThemeContext";
import { useAppData } from "@/context/AppDataContext";
import { clearStorage } from "@/services/storageService";
import { deleteApiKey, getApiKey, saveApiKey } from "@/services/secureStoreService";

export default function SettingsScreen() {
  const { theme, isDarkMode } = useTheme();
  const { settings, updateSettings, snippets, files, refresh } = useAppData();
  const [apiKeyInput, setApiKeyInput] = useState("");

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar style={isDarkMode ? "light" : "dark"} />
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <Text style={styles.label}>Preferred Language</Text>
          <TextInput style={styles.input} value={settings.preferredLanguage} onChangeText={(value) => updateSettings({ preferredLanguage: value })} />
          <Text style={styles.label}>Font Size</Text>
          <TextInput style={styles.input} keyboardType="numeric" value={String(settings.fontSize)} onChangeText={(v) => updateSettings({ fontSize: Number(v) || 14 })} />
          <View style={styles.row}>
            <Text style={styles.label}>Auto Backup</Text>
            <Switch value={settings.autoBackup} onValueChange={(value) => updateSettings({ autoBackup: value })} />
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>AI API Key (SecureStore)</Text>
          <TextInput style={styles.input} placeholder="Paste API key" placeholderTextColor="#777" value={apiKeyInput} onChangeText={setApiKeyInput} />
          <View style={styles.row}>
            <TouchableOpacity style={styles.btn} onPress={() => saveApiKey(apiKeyInput)}><Text style={styles.btnText}>Save Key</Text></TouchableOpacity>
            <TouchableOpacity
              style={styles.btn}
              onPress={async () => {
                const key = await getApiKey();
                Alert.alert("Stored key", key ? `Saved (${key.slice(0, 6)}...)` : "No key stored");
              }}
            >
              <Text style={styles.btnText}>Check</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={() => deleteApiKey()}><Text style={styles.btnText}>Delete</Text></TouchableOpacity>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.stats}>Snippets: {snippets.length}</Text>
          <Text style={styles.stats}>Exported Files: {files.length}</Text>
          <TouchableOpacity style={styles.dangerBtn} onPress={async () => { await clearStorage(); await refresh(); }}>
            <Text style={styles.dangerText}>Clear AsyncStorage</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 16, gap: 12 },
  card: { backgroundColor: "#121214", borderWidth: 1, borderColor: "#1e1e24", borderRadius: 12, padding: 12, gap: 10 },
  label: { color: "#ddd", fontSize: 13 },
  input: { backgroundColor: "#0f0f11", borderWidth: 1, borderColor: "#232329", borderRadius: 8, color: "#fff", padding: 10 },
  row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 8 },
  btn: { backgroundColor: "#1b2434", borderRadius: 8, paddingHorizontal: 10, paddingVertical: 8 },
  btnText: { color: "#93b4ff", fontWeight: "600" },
  stats: { color: "#ddd" },
  dangerBtn: { backgroundColor: "#331313", borderRadius: 8, padding: 10, marginTop: 8, alignItems: "center" },
  dangerText: { color: "#f87171", fontWeight: "700" },
});
