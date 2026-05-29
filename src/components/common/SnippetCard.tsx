import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "@/context/ThemeContext";

interface SnippetCardProps {
  id: string;
  code: string;
  title: string;
  timeAgo: string;
  tags?: string[];
  isFavorite?: boolean;
}

export default function SnippetCard({ id, code, title, timeAgo, tags = ["JAVASCRIPT"], isFavorite = true }: SnippetCardProps) {
  const { theme, isDarkMode } = useTheme();
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: "/home/snippet-details",
      params: { id, code, title, timeAgo, tags: JSON.stringify(tags) },
    });
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handlePress}
      style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}
    >
      <View style={styles.cardHeader}>
        <View style={styles.dots}>
          <View style={[styles.dot, { backgroundColor: "#ff5f56" }]} />
          <View style={[styles.dot, { backgroundColor: "#ffbd2e" }]} />
          <View style={[styles.dot, { backgroundColor: "#27c93f" }]} />
        </View>

        <Text style={[styles.titleText, { color: theme.subText }]}>{title}</Text>

        <TouchableOpacity style={styles.starButton}>
          <Ionicons name={isFavorite ? "star" : "star-outline"} size={18} color={theme.primary} />
        </TouchableOpacity>
      </View>

      <View style={[styles.codeContainer, { backgroundColor: isDarkMode ? "#09090b" : theme.cardAlt }]}>
        <Text style={[styles.codeText, { color: isDarkMode ? "#c084fc" : "#5b21b6" }]} numberOfLines={8}>
          {code}
        </Text>
      </View>

      <View style={styles.cardFooter}>
        <View style={[styles.tagContainer, { backgroundColor: theme.cardAlt }]}>
          <Text style={[styles.tagText, { color: theme.subText }]}>{tags[0]}</Text>
        </View>
        <Text style={[styles.timeText, { color: theme.subText }]}>{timeAgo}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 16,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  dots: {
    flexDirection: "row",
    gap: 6,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  titleText: {
    fontSize: 13,
    fontFamily: "monospace",
    marginLeft: 14,
  },
  starButton: {
    marginLeft: "auto",
  },
  codeContainer: {
    borderRadius: 10,
    padding: 16,
    minHeight: 120,
  },
  codeText: {
    fontFamily: "monospace",
    fontSize: 13,
    lineHeight: 20,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 14,
  },
  tagContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  tagText: {
    fontSize: 10,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  timeText: {
    fontSize: 12,
  },
});
