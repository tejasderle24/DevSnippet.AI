import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, StyleSheet } from "react-native";

const CATEGORIES = ["ALL FILES", "IMAGES", "DOCS", "CODE", "AUDIO"];

export default function FileCategoryFilters() {
  const [activeTab, setActiveTab] = useState("ALL FILES");

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
            onPress={() => setActiveTab(category)}
            style={[
              styles.pill,
              isActive ? styles.pillActive : styles.pillInactive,
            ]}
          >
            <Text style={[styles.pillText, isActive ? styles.textActive : styles.textInactive]}>
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