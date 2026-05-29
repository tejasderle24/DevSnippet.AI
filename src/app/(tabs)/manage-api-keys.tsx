import { Stack } from "expo-router";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@/context/ThemeContext";
import { deleteApiKey, getApiKey, saveApiKey } from "@/lib/ai-key";

export default function ManageApiKeysScreen() {
  const { theme } = useTheme();
  const [apiKey, setApiKey] = useState("");
  const [statusText, setStatusText] = useState("No checks yet");

  const handleSave = async () => {
    const value = apiKey.trim();
    if (!value) {
      Alert.alert("Missing key", "Enter an API key before saving.");
      return;
    }
    await saveApiKey(value);
    setStatusText("Saved in secure storage");
    Alert.alert("Saved", "API key saved securely.");
  };

  const handleCheck = async () => {
    const value = await getApiKey();
    if (!value) {
      setStatusText("No key found");
      Alert.alert("No key", "No API key is currently saved.");
      return;
    }
    setStatusText("Key exists in secure storage");
    const masked = value.length > 8 ? `${value.slice(0, 4)}...${value.slice(-4)}` : "********";
    Alert.alert("Key found", `Stored key: ${masked}`);
  };

  const handleDelete = async () => {
    await deleteApiKey();
    setApiKey("");
    setStatusText("Key deleted");
    Alert.alert("Deleted", "Stored API key removed.");
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <Stack.Screen options={{ title: "Manage API Keys", headerShown: true, headerTintColor: theme.text, headerStyle: { backgroundColor: theme.background } }} />

      <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <View style={styles.titleRow}>
          <Feather name="key" size={18} color={theme.icon} />
          <Text style={[styles.title, { color: theme.text }]}>OpenAI API key</Text>
        </View>

        <TextInput
          placeholder="sk-..."
          placeholderTextColor={theme.subText}
          value={apiKey}
          onChangeText={setApiKey}
          autoCapitalize="none"
          autoCorrect={false}
          style={[styles.input, { backgroundColor: theme.input, color: theme.text, borderColor: theme.border }]}
        />

        <Text style={[styles.status, { color: theme.subText }]}>Status: {statusText}</Text>

        <TouchableOpacity style={[styles.button, { backgroundColor: theme.primary }]} onPress={handleSave}>
          <Text style={[styles.buttonText, { color: theme.switchThumb }]}>Save Key</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, { backgroundColor: theme.cardAlt, borderColor: theme.border }]} onPress={handleCheck}>
          <Text style={[styles.buttonText, { color: theme.text }]}>Check Key</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, { backgroundColor: theme.danger }]} onPress={handleDelete}>
          <Text style={[styles.buttonText, { color: theme.switchThumb }]}>Delete Key</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 16,
    gap: 12,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
  },
  status: {
    fontSize: 13,
  },
  button: {
    minHeight: 44,
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "700",
  },
});
