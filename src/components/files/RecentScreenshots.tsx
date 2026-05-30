import React from "react";
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "@/context/ThemeContext";

interface ScreenshotItem {
  id: string;
  name: string;
  uri: string;
}

interface RecentScreenshotsProps {
  screenshots: ScreenshotItem[];
  onViewAll?: () => void;
}

export default function RecentScreenshots({ screenshots, onViewAll }: RecentScreenshotsProps) {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Recent Screenshots</Text>
        <TouchableOpacity onPress={onViewAll}>
          <Text style={[styles.viewAll, { color: theme.subText }]}>VIEW ALL</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        {screenshots.map((item) => (
          <View key={item.id} style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Image source={{ uri: item.uri }} style={styles.image} resizeMode="cover" />
            <View style={styles.overlay}>
              <Text style={[styles.fileName, { color: theme.text }]}>{item.name}</Text>
            </View>
          </View>
        ))}
        {screenshots.length === 0 && (
          <View style={[styles.emptyCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Text style={{ color: theme.subText, fontSize: 12 }}>No screenshots attached yet.</Text>
          </View>
        )}
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
  emptyCard: {
    width: 210,
    height: 130,
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
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
