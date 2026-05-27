import React, { useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@/context/ThemeContext";

export default function CreateSnippet() {
    const { theme } = useTheme();
    const router = useRouter();
    const [tags, setTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState("");

    const [selectedLanguage, setSelectedLanguage] = useState("TypeScript");
    const [showLanguages, setShowLanguages] = useState(false);

    const languages = [
        "TypeScript",
        "JavaScript",
        "Python",
        "Go",
        "React",
        "Node",
    ];

    // Map selected language to its file name format
    const getTabFilename = (lang: string): string => {
        switch (lang) {
            case "TypeScript": return "MAIN.TS";
            case "JavaScript": return "MAIN.JS";
            case "Python": return "MAIN.PY";
            case "Go": return "MAIN.GO";
            case "React": return "INDEX.JSX";
            case "Node": return "APP.JS";
            default: return "MAIN.TXT";
        }
    };

    // Helper function to process adding a valid tag
    const handleAddTag = () => {
        if (tagInput.trim()) {
            setTags([...tags, tagInput.trim()]);
            setTagInput("");
        }
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: "#09090b" }]}>
            {/* HEADER */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Text style={styles.backIcon}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>New Snippet</Text>
                <TouchableOpacity onPress={() => router.back()}>
                    <Text style={styles.cancelBtn}>CANCEL</Text>
                </TouchableOpacity>
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollPadding}>

                    {/* SNIPPET TITLE */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>SNIPPET TITLE</Text>
                        <TextInput
                            placeholder="e.g. Fetch API Wrapper"
                            placeholderTextColor="#3f3f46"
                            style={styles.textInput}
                        />
                    </View>

                    {/* LANGUAGE SELECT */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>LANGUAGE</Text>

                        <TouchableOpacity
                            style={styles.dropdown}
                            onPress={() => setShowLanguages(!showLanguages)}
                        >
                            <Text style={styles.dropdownText}>{selectedLanguage}</Text>

                            <Ionicons
                                name={showLanguages ? "chevron-up" : "chevron-down"}
                                size={18}
                                color="#71717a"
                            />
                        </TouchableOpacity>

                        {showLanguages && (
                            <View style={styles.languageDropdown}>
                                {languages.map((lang) => (
                                    <TouchableOpacity
                                        key={lang}
                                        style={styles.languageItem}
                                        onPress={() => {
                                            setSelectedLanguage(lang);
                                            setShowLanguages(false);
                                        }}
                                    >
                                        <Text style={styles.languageItemText}>{lang}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    </View>

                    {/* CODE EDITOR WINDOW */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>CODE SOURCE</Text>
                        <View style={styles.editorWindow}>
                            <View style={styles.editorHeader}>
                                <View style={styles.dots}>
                                    <View style={[styles.dot, { backgroundColor: "#ef4444" }]} />
                                    <View style={[styles.dot, { backgroundColor: "#eab308" }]} />
                                    <View style={[styles.dot, { backgroundColor: "#22c55e" }]} />
                                </View>
                                {/* Extension changes dynamically based on selection state */}
                                <View style={styles.tab}>
                                    <Text style={styles.tabText}>{getTabFilename(selectedLanguage)}</Text>
                                </View>
                            </View>
                            <View style={styles.editorBody}>
                                {/* Simulated Line Numbers */}
                                <View style={styles.lineNumbers}>
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((n) => (
                                        <Text key={n} style={styles.lineNumberText}>{n}</Text>
                                    ))}
                                </View>
                                <TextInput
                                    multiline
                                    style={styles.codeContent}
                                    placeholder="// Paste your code here..."
                                    placeholderTextColor="#3f3f46"
                                    spellCheck={false}
                                    autoCorrect={false}
                                    autoCapitalize="none"
                                />
                            </View>
                        </View>
                    </View>

                    {/* TAGS */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>TAGS</Text>

                        <View style={styles.tagContainer}>
                            {tags.map((tag, index) => (
                                <View key={index} style={styles.tag}>
                                    <Text style={styles.tagText}>{tag}</Text>

                                    {/* Handle removing tags */}
                                    <TouchableOpacity
                                        onPress={() => {
                                            setTags(tags.filter((_, i) => i !== index));
                                        }}
                                    >
                                        <Ionicons name="close" size={14} color="#94a3b8" />
                                    </TouchableOpacity>
                                </View>
                            ))}

                            {/* Tag Entry Input Area */}
                            <View style={styles.inlineInputWrapper}>
                                <TextInput
                                    placeholder="Add tag..."
                                    placeholderTextColor="#3f3f46"
                                    style={styles.addTagInput}
                                    value={tagInput}
                                    onChangeText={setTagInput}
                                    onSubmitEditing={handleAddTag}
                                    returnKeyType="done"
                                />
                                {tagInput.trim().length > 0 && (
                                    <TouchableOpacity style={styles.smallAddBtn} onPress={handleAddTag}>
                                        <Ionicons name="add" size={16} color="#000" />
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>
                    </View>

                    {/* ATTACH BUTTON */}
                    <TouchableOpacity style={styles.attachBtn}>
                        <Ionicons name="attach" size={20} color="#b4c6ff" />
                        <Text style={styles.attachBtnText}>ATTACH FILE</Text>
                    </TouchableOpacity>

                    {/* FEATURE BANNERS */}
                    <View style={styles.banner}>
                        <View style={[styles.bannerIcon, { backgroundColor: "#1e1b4b" }]}>
                            <MaterialCommunityIcons name="creation" size={20} color="#818cf8" />
                        </View>
                        <View style={styles.bannerTextContainer}>
                            <Text style={styles.bannerTitle}>AI Optimization</Text>
                            <Text style={styles.bannerSub}>Your snippet will be automatically indexed and searchable by the AI assistant.</Text>
                        </View>
                    </View>

                    <View style={styles.banner}>
                        <View style={[styles.bannerIcon, { backgroundColor: "#2e1065" }]}>
                            <MaterialCommunityIcons name="cloud-sync" size={20} color="#a855f7" />
                        </View>
                        <View style={styles.bannerTextContainer}>
                            <Text style={styles.bannerTitle}>Auto-sync Active</Text>
                            <Text style={styles.bannerSub}>All changes are saved to your global cloud vault instantly.</Text>
                        </View>
                    </View>

                </ScrollView>
            </KeyboardAvoidingView>

            {/* SAVE BUTTON */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.saveBtn}>
                    <MaterialCommunityIcons name="content-save-outline" size={22} color="#000" />
                    <Text style={styles.saveBtnText}>Save Snippet</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        height: 60,
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
    cancelBtn: { color: "#71717a", fontWeight: "600", fontSize: 12 },
    headerTitle: { color: "#fff", fontSize: 18, fontWeight: "bold" },
    profileCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: "#27272a",
        justifyContent: "center",
        alignItems: "center",
    },
    profileLetter: { color: "#fff", fontSize: 12, fontWeight: "bold" },
    scrollPadding: { paddingHorizontal: 20, paddingBottom: 40 },
    inputGroup: { marginTop: 24 },
    label: { color: "#52525b", fontSize: 11, fontWeight: "bold", marginBottom: 8, letterSpacing: 1 },
    textInput: {
        backgroundColor: "#121214",
        borderWidth: 1,
        borderColor: "#1e1e24",
        borderRadius: 10,
        padding: 16,
        color: "#fff",
        fontSize: 15,
    },
    dropdown: {
        backgroundColor: "#121214",
        borderWidth: 1,
        borderColor: "#1e1e24",
        borderRadius: 10,
        padding: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    dropdownText: { color: "#fff", fontSize: 15 },
    languageDropdown: {
        backgroundColor: "#121214",
        borderWidth: 1,
        borderColor: "#1e1e24",
        borderRadius: 10,
        marginTop: 8,
        overflow: "hidden",
    },
    languageItem: {
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: "#1e1e24",
    },
    languageItemText: {
        color: "#fff",
        fontSize: 14,
    },
    editorWindow: {
        backgroundColor: "#121214",
        borderWidth: 1,
        borderColor: "#1e1e24",
        borderRadius: 12,
        overflow: "hidden",
    },
    editorHeader: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
        height: 40,
        backgroundColor: "#18181b",
        borderBottomWidth: 1,
        borderBottomColor: "#1e1e24",
    },
    dots: { flexDirection: "row", gap: 6 },
    dot: { width: 8, height: 8, borderRadius: 4 },
    tab: {
        marginLeft: 20,
        paddingHorizontal: 12,
        height: "100%",
        justifyContent: "center",
        borderBottomWidth: 2,
        borderBottomColor: "#93b4ff",
    },
    tabText: { color: "#fff", fontSize: 10, fontWeight: "bold" },
    editorBody: { flexDirection: "row", minHeight: 250, padding: 12 },
    lineNumbers: { width: 25, marginRight: 10 },
    lineNumberText: { color: "#3f3f46", fontSize: 12, lineHeight: 20, textAlign: "right" },
    codeContent: {
        flex: 1,
        color: "#a5b4fc",
        fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
        fontSize: 14,
        textAlignVertical: "top",
        lineHeight: 20,
    },
    tagContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        backgroundColor: "#121214",
        borderWidth: 1,
        borderColor: "#1e1e24",
        borderRadius: 10,
        padding: 8,
        gap: 8,
        alignItems: "center",
    },
    tag: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#1e1e24",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 6,
        gap: 6,
    },
    tagText: { color: "#94a3b8", fontSize: 13 },
    inlineInputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
        minWidth: 120,
    },
    addTagInput: {
        color: "#fff",
        fontSize: 13,
        flex: 1,
        paddingLeft: 8,
        height: 32,
    },
    smallAddBtn: {
        backgroundColor: "#93b4ff",
        width: 24,
        height: 24,
        borderRadius: 6,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 6,
    },
    attachBtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        padding: 12,
        borderWidth: 1,
        borderColor: "#1e1e24",
        borderRadius: 10,
        backgroundColor: "#121214",
        gap: 8,
    },
    attachBtnText: { color: "#b4c6ff", fontSize: 12, fontWeight: "bold" },
    banner: {
        flexDirection: "row",
        marginTop: 20,
        padding: 16,
        backgroundColor: "#121214",
        borderRadius: 16,
        gap: 16,
    },
    bannerIcon: { width: 40, height: 40, borderRadius: 10, justifyContent: "center", alignItems: "center" },
    bannerTextContainer: { flex: 1 },
    bannerTitle: { color: "#fff", fontSize: 14, fontWeight: "bold", marginBottom: 4 },
    bannerSub: { color: "#71717a", fontSize: 12, lineHeight: 16 },
    footer: {
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: "#1e1e24",
    },
    saveBtn: {
        backgroundColor: "#93b4ff",
        height: 56,
        borderRadius: 16,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
    },
    saveBtnText: { color: "#000", fontSize: 16, fontWeight: "bold" },
});