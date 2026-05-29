import { useTheme } from "@/context/ThemeContext";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";

const DEFAULT_LANGUAGES = ["ALL", "TYPESCRIPT", "JAVASCRIPT", "PYTHON", "GO", "REACT", "NODE", "CSS", "TAILWIND"];

interface LanguageFiltersProps {
  selected: string;
  onSelect: (language: string) => void;
  languages?: string[];
}

export default function LanguageFilters({ selected, onSelect, languages = DEFAULT_LANGUAGES }: LanguageFiltersProps) {
  const { theme } = useTheme();

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.container}>
      {languages.map((lang) => {
        const isSelected = selected === lang;
        return (
          <TouchableOpacity
            key={lang}
            onPress={() => onSelect(lang)}
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
