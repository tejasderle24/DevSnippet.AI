import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useTheme } from "@/context/ThemeContext";

const LANGUAGES = ["ALL LANGUAGES", "REACT", "PYTHON", "TAILWIND"];

export default function LanguageFilters() {
  const { theme } = useTheme();
  const [selected, setSelected] = useState("ALL LANGUAGES");

  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false} 
      contentContainerStyle={styles.container}
    >
      {LANGUAGES.map((lang) => {
        const isSelected = selected === lang;
        return (
          <TouchableOpacity
            key={lang}
            onPress={() => setSelected(lang)}
            style={[
              styles.pill,
              { 
                backgroundColor: isSelected ? "#93b4ff" : "#1e1e24",
                borderColor: isSelected ? "#93b4ff" : "#2d2d34"
              }
            ]}
          >
            <Text 
              style={[
                styles.text, 
                { color: isSelected ? "#000000" : "#a0a0a5" }
              ]}
            >
              {lang}
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
    paddingVertical: 12,
    gap: 8,
  },
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  text: {
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
});