import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; 

interface SnippetCardProps {
  id: string;
  code: string;
  title: string;
  timeAgo: string;
  tags?: string[];
  isFavorite?: boolean;
}

export default function SnippetCard({ id, code, title, timeAgo, tags = ["JAVASCRIPT"], isFavorite = true }: SnippetCardProps) {
  const { theme } = useTheme();
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: "/home/snippet-details",
      params: { id, code, title, timeAgo, tags: JSON.stringify(tags) }
    });
  };

  return (
    <TouchableOpacity 
      activeOpacity={0.8} 
      onPress={handlePress}
      style={[styles.card, { backgroundColor: "#16161a", borderColor: "#232329" }]}
    >
      {/* Top Header: Dots, Title, and Star */}
      <View style={styles.cardHeader}>
        <View style={styles.dots}>
          <View style={[styles.dot, { backgroundColor: "#ff5f56" }]} />
          <View style={[styles.dot, { backgroundColor: "#ffbd2e" }]} />
          <View style={[styles.dot, { backgroundColor: "#27c93f" }]} />
        </View>
        
        <Text style={styles.titleText}>{title}</Text>
        
        <TouchableOpacity style={styles.starButton}>
          <Ionicons name={isFavorite ? "star" : "star-outline"} size={18} color="#93c5fd" />
        </TouchableOpacity>
      </View>

      {/* Code Block Window */}
      <View style={styles.codeContainer}>
        <Text style={styles.codeText} numberOfLines={8}>
          {code}
        </Text>
      </View>

      {/* Bottom Footer: Tag and Time */}
      <View style={styles.cardFooter}>
        <View style={styles.tagContainer}>
          <Text style={styles.tagText}>{tags[0]}</Text>
        </View>
        <Text style={styles.timeText}>{timeAgo}</Text>
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
    color: "#a1a1aa",
    fontSize: 13,
    fontFamily: "monospace",
    marginLeft: 14,
  },
  starButton: {
    marginLeft: "auto",
  },
  codeContainer: {
    backgroundColor: "#09090b",
    borderRadius: 10,
    padding: 16,
    minHeight: 120,
  },
  codeText: {
    color: "#c084fc", 
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
    backgroundColor: "#27272a",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  tagText: {
    color: "#a1a1aa",
    fontSize: 10,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  timeText: {
    color: "#71717a",
    fontSize: 12,
  },
});