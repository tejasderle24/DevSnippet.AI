import { useTheme } from "@/context/ThemeContext";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface FavoriteCardProps {
  title: string;
  langTag: string;
  description?: string;
}

export default function FavoriteCard({ title, description, langTag }: FavoriteCardProps) {
  const { theme } = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <View style={styles.header}>
        <Text style={styles.heartIcon}>{"❤️"}</Text>
        <View style={[styles.tag, { backgroundColor: theme.cardAlt }]}>
          <Text style={[styles.tagText, { color: theme.subText }]}>{langTag}</Text>
        </View>
      </View>
      <Text style={[styles.title, { color: theme.text }]} numberOfLines={1}>
        {title}
      </Text>
      {description ? (
        <Text style={[styles.description, { color: theme.subText }]} numberOfLines={2}>
          {description}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
    flex: 1,
    minWidth: "46%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  heartIcon: {
    fontSize: 16,
  },
  tag: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  tagText: {
    fontSize: 10,
    fontWeight: "bold",
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    lineHeight: 16,
  },
});
