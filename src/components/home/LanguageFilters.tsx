import { useTheme } from "@/context/ThemeContext";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";

const LANGUAGES = ["ALL LANGUAGES", "REACT", "PYTHON", "TAILWIND"];

export default function LanguageFilters() {
  const { theme } = useTheme();
  const [selected, setSelected] = useState("ALL LANGUAGES");

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.container}>
      {LANGUAGES.map((lang) => {
        const isSelected = selected === lang;
        return (
          <TouchableOpacity
            key={lang}
            onPress={() => setSelected(lang)}
            style={[
              styles.pill,
              {
                backgroundColor: isSelected ? theme.primary : theme.cardAlt,
                borderColor: isSelected ? theme.primary : theme.border,
              },
            ]}
          >
            <Text style={[styles.text, { color: isSelected ? theme.switchThumb : theme.subText }]}>{lang}</Text>
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
