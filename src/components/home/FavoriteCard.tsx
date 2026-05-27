import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface FavoriteCardProps {
  title: string;
  description: string;
  langTag: string;
}

export default function FavoriteCard({ title, description, langTag }: FavoriteCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        {/* Simple inline representation of the pink heart icon */}
        <Text style={styles.heartIcon}>❤️</Text>
        <View style={styles.tag}>
          <Text style={styles.tagText}>{langTag}</Text>
        </View>
      </View>
      <Text style={styles.title} numberOfLines={1}>{title}</Text>
      <Text style={styles.description} numberOfLines={2}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#121214",
    borderColor: "#1e1e24",
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
    flex: 1, // dynamically sizing handles the grid layout widths
    minWidth: "46%", 
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  heartIcon: {
    fontSize: 18,
  },
  tag: {
    backgroundColor: "#1e1e24",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  tagText: {
    color: "#a0a0a5",
    fontSize: 10,
    fontWeight: "bold",
  },
  title: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  description: {
    color: "#a0a0a5",
    fontSize: 12,
    lineHeight: 16,
  },
});