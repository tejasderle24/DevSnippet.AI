import { useTheme } from "@/context/ThemeContext";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SnippetDetailsScreen() {
  const { theme, isDarkMode } = useTheme();
  const router = useRouter();
  const params = useLocalSearchParams();

  const title = (params.title as string) || "FetchUserPayload.ts";
  const tags: string[] = params.tags ? JSON.parse(params.tags as string) : ["TYPESCRIPT", "REACT CONTEXT"];
  const code =
    (params.code as string) ||
    "import { UserType } from '@/types';\n\nexport const fetchUserData = async (userId) => {\n  const response = await fetch(`/api/users/${userId}`);\n  return response.json();\n};";
  const timeAgo = (params.timeAgo as string) || "2 hours ago";

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]} edges={["top"]}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={[styles.header, { borderBottomColor: theme.border }]}>
        <TouchableOpacity style={styles.iconButton} onPress={() => router.back()}>
          <Feather name="arrow-left" size={22} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerAppTitle, { color: theme.text }]}>DevSnippets AI</Text>
        <TouchableOpacity style={styles.iconButton}>
          <Feather name="edit-3" size={20} color={theme.text} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.metaContainer}>
          <Text style={[styles.snippetTitle, { color: theme.text }]}>{title}</Text>
          <View style={styles.tagRow}>
            {tags.map((tag, idx) => (
              <View key={idx} style={[styles.tagBadge, { backgroundColor: theme.cardAlt, borderColor: theme.border }]}>
                <Text style={[styles.tagText, { color: theme.success }]}>{tag.toUpperCase()}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={[styles.editorWindow, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <View style={[styles.editorHeader, { backgroundColor: theme.cardAlt }]}>
            <View style={styles.dots}>
              <View style={[styles.dot, { backgroundColor: "#ef4444" }]} />
              <View style={[styles.dot, { backgroundColor: "#eab308" }]} />
              <View style={[styles.dot, { backgroundColor: "#22c55e" }]} />
            </View>
          </View>
          <View style={[styles.codeWrapper, { backgroundColor: isDarkMode ? "#09090b" : theme.cardAlt }]}>
            <Text style={[styles.codeText, { color: isDarkMode ? "#a5b4fc" : "#4338ca" }]}>{code}</Text>
          </View>
        </View>

        <View style={styles.actionRow}>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <MaterialCommunityIcons name="content-copy" size={20} color={theme.subText} />
            <Text style={[styles.actionButtonText, { color: theme.subText }]}>COPY</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Feather name="share-2" size={18} color={theme.subText} />
            <Text style={[styles.actionButtonText, { color: theme.subText }]}>SHARE</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Feather name="download" size={18} color={theme.subText} />
            <Text style={[styles.actionButtonText, { color: theme.subText }]}>EXPORT</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.aiCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <View style={styles.aiHeader}>
            <View style={[styles.aiIconContainer, { backgroundColor: theme.cardAlt }]}>
              <MaterialCommunityIcons name="creation" size={20} color={theme.primary} />
            </View>
            <View style={styles.aiTextWrapper}>
              <Text style={[styles.aiTitle, { color: theme.text }]}>Explain with AI</Text>
              <Text style={[styles.aiDescription, { color: theme.subText }]}>
                Get a deep-dive analysis of logic flow, potential edge cases, and optimization suggestions for this snippet.
              </Text>
            </View>
          </View>

          <TouchableOpacity style={[styles.generateButton, { backgroundColor: theme.primary }]}>
            <MaterialCommunityIcons name="lightning-bolt" size={16} color={theme.switchThumb} style={{ marginRight: 6 }} />
            <Text style={[styles.generateButtonText, { color: theme.switchThumb }]}>GENERATE EXPLANATION</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.gridRow}>
          <View style={[styles.gridCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Feather name="clock" size={20} color={theme.subText} style={{ marginBottom: 8 }} />
            <Text style={[styles.gridLabel, { color: theme.text }]}>Modified</Text>
            <Text style={[styles.gridValue, { color: theme.subText }]}>{timeAgo}</Text>
          </View>

          <View style={[styles.gridCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <View style={styles.avatarRow}>
              <View style={[styles.avatar, { backgroundColor: "#3b82f6", borderColor: theme.card }]} />
              <View style={[styles.avatar, { backgroundColor: "#10b981", marginLeft: -8, borderColor: theme.card }]} />
              <View style={[styles.avatarCount, { marginLeft: -8, backgroundColor: theme.cardAlt, borderColor: theme.card }]}>
                <Text style={[styles.avatarCountText, { color: theme.subText }]}>+4</Text>
              </View>
            </View>
            <Text style={[styles.gridLabel, { color: theme.text }]}>Shared</Text>
            <Text style={[styles.gridValue, { color: theme.subText }]}>Viewed 142 times</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    height: 56,
    borderBottomWidth: 1,
  },
  headerAppTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  iconButton: {
    padding: 6,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  metaContainer: {
    marginTop: 20,
    marginBottom: 16,
  },
  snippetTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tagBadge: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  tagText: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  editorWindow: {
    borderWidth: 1,
    borderRadius: 14,
    overflow: "hidden",
    marginBottom: 20,
  },
  editorHeader: {
    height: 38,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
  },
  dots: {
    flexDirection: "row",
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  codeWrapper: {
    padding: 16,
  },
  codeText: {
    fontFamily: "monospace",
    fontSize: 13,
    lineHeight: 20,
  },
  actionRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },
  actionButton: {
    flex: 1,
    borderWidth: 1,
    height: 52,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
  actionButtonText: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  aiCard: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  aiHeader: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  aiIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  aiTextWrapper: {
    flex: 1,
  },
  aiTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },
  aiDescription: {
    fontSize: 12,
    lineHeight: 18,
  },
  generateButton: {
    height: 44,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  generateButtonText: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  gridRow: {
    flexDirection: "row",
    gap: 12,
  },
  gridCard: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 14,
    padding: 16,
    minHeight: 100,
  },
  gridLabel: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 2,
  },
  gridValue: {
    fontSize: 12,
  },
  avatarRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1.5,
  },
  avatarCount: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1.5,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarCountText: {
    fontSize: 9,
    fontWeight: "bold",
  },
});
