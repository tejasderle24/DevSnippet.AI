import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "@/context/ThemeContext";

const CATEGORIES = ["ALL FILES", "IMAGES", "DOCS", "CODE", "AUDIO"];

interface FileCategoryFiltersProps {
  onChange?: (category: string) => void;
}

export default function FileCategoryFilters({ onChange }: FileCategoryFiltersProps) {
  const [activeTab, setActiveTab] = useState("ALL FILES");
  const { theme } = useTheme();

  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false} 
      contentContainerStyle={styles.container}
    >
      {CATEGORIES.map((category) => {
        const isActive = activeTab === category;
        return (
          <TouchableOpacity
            key={category}
            onPress={() => {
              setActiveTab(category);
              onChange?.(category);
            }}
            style={[
              styles.pill,
              isActive
                ? [styles.pillActive, { backgroundColor: theme.cardAlt, borderColor: theme.border }]
                : [styles.pillInactive, { borderColor: theme.border }],
            ]}
          >
            <Text style={[styles.pillText, isActive ? [styles.textActive, { color: theme.text }] : [styles.textInactive, { color: theme.subText }]]}>
              {category}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    gap: 10,
    marginVertical: 16,
  },
  pill: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
  },
  pillActive: {
    backgroundColor: "#222531",
    borderColor: "#3b4252",
  },
  pillInactive: {
    backgroundColor: "transparent",
    borderColor: "#232329",
  },
  pillText: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
  },
  textActive: {
    color: "#ffffff",
  },
  textInactive: {
    color: "#a1a1aa",
  },
});
