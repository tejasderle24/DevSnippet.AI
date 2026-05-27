import { StatusBar } from "expo-status-bar";
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/common/Header";
import { useTheme } from "@/context/ThemeContext";
import { useAppData } from "@/context/AppDataContext";
import { deleteExportedFile, shareFile } from "@/services/fileSystemService";

export default function FilesScreen() {
  const { theme, isDarkMode } = useTheme();
  const { files, removeManagedFile } = useAppData();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar style={isDarkMode ? "light" : "dark"} />
      <Header />
      <ScrollView contentContainerStyle={styles.content}>
        {files.map((file) => (
          <View key={file.id} style={styles.card}>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{file.name}</Text>
              <Text style={styles.meta}>{file.type.toUpperCase()}</Text>
            </View>
            <TouchableOpacity onPress={() => shareFile(file.path)}><Text style={styles.action}>Share</Text></TouchableOpacity>
            <TouchableOpacity
              onPress={async () => {
                try {
                  await deleteExportedFile(file.path);
                  await removeManagedFile(file.id);
                } catch (error) {
                  Alert.alert("Delete failed", (error as Error).message);
                }
              }}
            >
              <Text style={[styles.action, { color: "#f87171" }]}>Delete</Text>
            </TouchableOpacity>
          </View>
        ))}
        {files.length === 0 ? <Text style={styles.empty}>No exported files yet.</Text> : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, gap: 10 },
  card: { borderWidth: 1, borderColor: "#232329", backgroundColor: "#121214", borderRadius: 12, padding: 12, flexDirection: "row", gap: 12, alignItems: "center" },
  name: { color: "#fff", fontWeight: "600" },
  meta: { color: "#999", fontSize: 12, marginTop: 4 },
  action: { color: "#93b4ff", fontWeight: "600" },
  empty: { color: "#888", textAlign: "center", marginTop: 32 },
});
