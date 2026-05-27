import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

interface FileItemCardProps {
  filename: string;
  meta: string;
  preview: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  iconColor: string;
}

export default function FileItemCard({ filename, meta, preview, icon, iconColor }: FileItemCardProps) {
  return (
    <View style={styles.card}>
      {/* Upper Meta Row */}
      <View style={styles.metaRow}>
        <View style={[styles.iconContainer, { backgroundColor: "#1e1e24" }]}>
          <MaterialCommunityIcons name={icon} size={22} color={iconColor} />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.filename}>{filename}</Text>
          <Text style={styles.metaText}>{meta}</Text>
        </View>

        {/* Action Tray */}
        <View style={styles.actionTray}>
          <TouchableOpacity style={styles.iconButton}>
            <Feather name="download" size={16} color="#a1a1aa" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Feather name="share-2" size={16} color="#a1a1aa" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Feather name="trash-2" size={16} color="#ef4444" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Code / Text Block Block */}
      <View style={styles.previewBox}>
        <Text style={[styles.previewText, { color: iconColor }]}>
          {preview}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#121214",
    borderWidth: 1,
    borderColor: "#1e1e24",
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    marginLeft: 12,
    flex: 1,
  },
  filename: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "600",
  },
  metaText: {
    color: "#71717a",
    fontSize: 12,
    marginTop: 2,
  },
  actionTray: {
    flexDirection: "row",
    gap: 6,
  },
  iconButton: {
    backgroundColor: "#1e1e24",
    width: 32,
    height: 32,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  previewBox: {
    backgroundColor: "#09090b",
    borderRadius: 8,
    padding: 14,
  },
  previewText: {
    fontFamily: "monospace",
    fontSize: 12,
    lineHeight: 18,
  },
});