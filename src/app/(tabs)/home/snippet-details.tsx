import React from "react";
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams, Stack } from "expo-router";
import { Feather, MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";

export default function SnippetDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // Parse parameters passed down or load crisp placeholder fallbacks
  const title = (params.title as string) || "FetchUserPayload.ts";
  const tags: string[] = params.tags ? JSON.parse(params.tags as string) : ["TYPESCRIPT", "REACT CONTEXT"];
  const code = (params.code as string) || `import { UserType } from '@/types';\n\nexport const fetchUserData = async (userId) => {\n  const response = await fetch(\`/api/users/\${userId}\`);\n  return response.json();\n};`;
  const timeAgo = (params.timeAgo as string) || "2 hours ago";

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* TOP HEADER BAR */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => router.back()}>
          <Feather name="arrow-left" size={22} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerAppTitle}>DevSnippets AI</Text>
        <TouchableOpacity style={styles.iconButton}>
          <Feather name="edit-3" size={20} color="#ffffff" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* TITLES & METADATA TAGS */}
        <View style={styles.metaContainer}>
          <Text style={styles.snippetTitle}>{title}</Text>
          <View style={styles.tagRow}>
            {tags.map((tag, idx) => (
              <View key={idx} style={styles.tagBadge}>
                <Text style={styles.tagText}>{tag.toUpperCase()}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* TERMINAL BACKDROP CODE WINDOW */}
        <View style={styles.editorWindow}>
          <View style={styles.editorHeader}>
            <View style={styles.dots}>
              <View style={[styles.dot, { backgroundColor: "#ef4444" }]} />
              <View style={[styles.dot, { backgroundColor: "#eab308" }]} />
              <View style={[styles.dot, { backgroundColor: "#22c55e" }]} />
            </View>
          </View>
          <View style={styles.codeWrapper}>
            <Text style={styles.codeText}>{code}</Text>
          </View>
        </View>

        {/* TRIPLE ACTION TOOLBAR ROW */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionButton}>
            <MaterialCommunityIcons name="content-copy" size={20} color="#a1a1aa" />
            <Text style={styles.actionButtonText}>COPY</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Feather name="share-2" size={18} color="#a1a1aa" />
            <Text style={styles.actionButtonText}>SHARE</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Feather name="download" size={18} color="#a1a1aa" />
            <Text style={styles.actionButtonText}>EXPORT</Text>
          </TouchableOpacity>
        </View>

        {/* EXPLAIN WITH AI FEATURE INTERFACE CARD */}
        <View style={styles.aiCard}>
          <View style={styles.aiHeader}>
            <View style={styles.aiIconContainer}>
              <MaterialCommunityIcons name="creation" size={20} color="#60a5fa" />
            </View>
            <View style={styles.aiTextWrapper}>
              <Text style={styles.aiTitle}>Explain with AI</Text>
              <Text style={styles.aiDescription}>
                Get a deep-dive analysis of logic flow, potential edge cases, and optimization suggestions for this snippet.
              </Text>
            </View>
          </View>
          
          <TouchableOpacity style={styles.generateButton}>
            <MaterialCommunityIcons name="lightning-bolt" size={16} color="#1d4ed8" style={{ marginRight: 6 }} />
            <Text style={styles.generateButtonText}>GENERATE EXPLANATION</Text>
          </TouchableOpacity>
        </View>

        {/* TWO-COLUMN METADATA GRID SECTION */}
        <View style={styles.gridRow}>
          <View style={styles.gridCard}>
            <Feather name="clock" size={20} color="#a1a1aa" style={{ marginBottom: 8 }} />
            <Text style={styles.gridLabel}>Modified</Text>
            <Text style={styles.gridValue}>{timeAgo}</Text>
          </View>

          <View style={styles.gridCard}>
            <View style={styles.avatarRow}>
              <View style={[styles.avatar, { backgroundColor: "#3b82f6" }]} />
              <View style={[styles.avatar, { backgroundColor: "#10b981", marginLeft: -8 }]} />
              <View style={[styles.avatarCount, { marginLeft: -8 }]}>
                <Text style={styles.avatarCountText}>+4</Text>
              </View>
            </View>
            <Text style={styles.gridLabel}>Shared</Text>
            <Text style={styles.gridValue}>Viewed 142 times</Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#09090b",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    height: 56,
    borderBottomWidth: 1,
    borderBottomColor: "#18181b",
  },
  headerAppTitle: {
    color: "#ffffff",
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
    color: "#ffffff",
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
    backgroundColor: "#141416",
    borderWidth: 1,
    borderColor: "#222227",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  tagText: {
    color: "#22c55e",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  editorWindow: {
    backgroundColor: "#121214",
    borderWidth: 1,
    borderColor: "#1e1e24",
    borderRadius: 14,
    overflow: "hidden",
    marginBottom: 20,
  },
  editorHeader: {
    height: 38,
    backgroundColor: "#161619",
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
    backgroundColor: "#09090b",
  },
  codeText: {
    color: "#a5b4fc",
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
    backgroundColor: "#18181b",
    borderWidth: 1,
    borderColor: "#27272a",
    height: 52,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
  actionButtonText: {
    color: "#a1a1aa",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  aiCard: {
    backgroundColor: "#151922",
    borderWidth: 1,
    borderColor: "#1e2638",
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
    backgroundColor: "#1e293b",
    justifyContent: "center",
    alignItems: "center",
  },
  aiTextWrapper: {
    flex: 1,
  },
  aiTitle: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },
  aiDescription: {
    color: "#94a3b8",
    fontSize: 12,
    lineHeight: 18,
  },
  generateButton: {
    backgroundColor: "#93b4ff",
    height: 44,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  generateButtonText: {
    color: "#1e3a8a",
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
    backgroundColor: "#121214",
    borderWidth: 1,
    borderColor: "#1e1e24",
    borderRadius: 14,
    padding: 16,
    minHeight: 100,
  },
  gridLabel: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 2,
  },
  gridValue: {
    color: "#71717a",
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
    borderColor: "#121214",
  },
  avatarCount: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#27272a",
    borderWidth: 1.5,
    borderColor: "#121214",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarCountText: {
    color: "#a1a1aa",
    fontSize: 9,
    fontWeight: "bold",
  },
});