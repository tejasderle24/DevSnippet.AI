import React, { useState } from "react";
import { StyleSheet, View, Text, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useTheme } from "@/context/ThemeContext";
import SnippetCard from "@/components/home/SnippetCard";

// Expanded dummy dataset representing "All Snippets"
const ALL_SNIPPETS = [
    {
        id: "1",
        filename: "AuthMiddleware.ts",
        title: "Next.js Edge Auth",
        timeAgo: "2h ago",
        code: "export const middleware = (req: NextReq...\n  const token = req.cookies.get('auth')\n  return NextResponse.next();\n};"
    },
    {
        id: "2",
        filename: "styles.css",
        title: "Modern Frosted Glass",
        timeAgo: "5h ago",
        code: ".glass-effect {\n  backdrop-filter: blur(12px);\n  background: rgba(255, 255, 255, 0.1);\n}"
    },
    {
        id: "3",
        filename: "DataFetcher.py",
        title: "Async Data Fetcher",
        timeAgo: "1 day ago",
        code: "import aiohttp\nimport asyncio\n\nasync def fetch(session, url):\n    async with session.get(url) as response:\n        return await response.json()"
    },
    {
        id: "4",
        filename: "Debounce.js",
        title: "Custom React Debounce Hook",
        timeAgo: "3 days ago",
        code: "function useDebounce(value, delay) {\n  const [debouncedValue, setDebouncedValue] = useState(value);\n  // hook implementation...\n}"
    }
];

export default function ViewAllScreen() {
    const { theme } = useTheme();
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");

    // Filter snippets locally based on search bar input
    const filteredSnippets = ALL_SNIPPETS.filter(snippet =>
        snippet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        snippet.filename.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background || "#09090b" }]}>

            {/* Custom Sub-Header for Navigation Back */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Text style={styles.backIcon}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>All Snippets</Text>
                {/* Layout balancer */}
                <View style={{ width: 40 }} />
            </View>
            {/* Embedded Search Bar matching dark mode inputs */}
            <View style={styles.searchContainer}>
                <TextInput
                    placeholder="Search snippets..."
                    placeholderTextColor="#71717a"
                    style={styles.searchInput}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>

            {/* Render list matching home styling */}
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <View style={styles.listContainer}>
                    {filteredSnippets.length > 0 ? (
                        filteredSnippets.map((item) => (
                            <SnippetCard
                                key={item.id}
                                filename={item.filename}
                                title={item.title}
                                timeAgo={item.timeAgo}
                                code={item.code}
                            />
                        ))
                    ) : (
                        <Text style={styles.emptyText}>No snippets found matching your search.</Text>
                    )}
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
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#1e1e24",
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "flex-start",
    },
    backIcon: {
        color: "#ffffff",
        fontSize: 24,
    },
    headerTitle: {
        color: "#ffffff",
        fontSize: 18,
        fontWeight: "bold",
    },
    searchContainer: {
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    searchInput: {
        backgroundColor: "#121214",
        borderWidth: 1,
        borderColor: "#232329",
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingVertical: 10,
        color: "#ffffff",
        fontSize: 14,
    },
    scrollContent: {
        paddingBottom: 40,
    },
    listContainer: {
        paddingHorizontal: 16,
        marginTop: 8,
    },
    emptyText: {
        color: "#71717a",
        fontSize: 14,
        textAlign: "center",
        marginTop: 40,
    }
});