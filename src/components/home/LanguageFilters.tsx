import React, { useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useTheme } from "@/context/ThemeContext";

type Props = {
  selectedLanguage?: string;
  languages?: string[];
  onSelectLanguage?: (language: string) => void;
};

export default function LanguageFilters({
  selectedLanguage,
  languages,
  onSelectLanguage,
}: Props) {
  useTheme();
  const [internalSelected, setInternalSelected] = useState("ALL LANGUAGES");
  const selected = selectedLanguage ?? internalSelected;
  const options = useMemo(
    () => languages ?? ["ALL LANGUAGES", "TypeScript", "JavaScript", "Python", "Go", "React", "Node"],
    [languages]
  );

  const handleSelect = (lang: string) => {
    setInternalSelected(lang);
    onSelectLanguage?.(lang);
  };

  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false} 
      contentContainerStyle={styles.container}
    >
      {options.map((lang) => {
        const isSelected = selected === lang;
        return (
          <TouchableOpacity
            key={lang}
            onPress={() => handleSelect(lang)}
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
