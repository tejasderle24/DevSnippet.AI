import React from "react";
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "@/context/ThemeContext";

const SCREENSHOTS = [
  { id: "1", name: "auth_flow_v2.png", uri: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?q=80&w=400" },
  { id: "2", name: "db_schema.png", uri: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=400" },
];

export default function RecentScreenshots() {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Recent Screenshots</Text>
        <TouchableOpacity>
          <Text style={[styles.viewAll, { color: theme.subText }]}>VIEW ALL</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        {SCREENSHOTS.map((item) => (
          <View key={item.id} style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Image source={{ uri: item.uri }} style={styles.image} resizeMode="cover" />
            <View style={styles.overlay}>
              <Text style={[styles.fileName, { color: theme.text }]}>{item.name}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
  },
  viewAll: {
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  scrollContainer: {
    paddingHorizontal: 16,
    gap: 14,
  },
  card: {
    width: 210,
    height: 130,
    borderRadius: 12,
    overflow: "hidden",
    position: "relative",
    borderWidth: 1,
  },
  image: {
    width: "100%",
    height: "100%",
    opacity: 0.4, // Match design's dark blending
  },
  overlay: {
    position: "absolute",
    bottom: 12,
    left: 12,
  },
  fileName: {
    fontFamily: "monospace",
    fontSize: 12,
    fontWeight: "600",
  },
});
