import React, { useEffect } from "react";
import { StyleSheet, Text, View, Image, StatusBar, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useTheme } from "@/context/ThemeContext";

const SplashScreen = () => {
  const router = useRouter();
  const { theme, isDarkMode } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/(tabs)/home");
    }, 1800);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={theme.background} />

      <LinearGradient
        colors={isDarkMode ? ["#1a1a1e", "#121214", "#0d0d0f"] : ["#f8fafc", "#f1f5f9", "#e2e8f0"]}
        style={styles.gradient}
      >
        <View style={styles.centerContent}>
          <View
            style={[
              styles.logoContainer,
              {
                backgroundColor: isDarkMode ? "rgba(255, 255, 255, 0.03)" : "rgba(15, 23, 42, 0.04)",
              },
            ]}
          >
            <Image source={require("../../../assets/images/icon.png")} style={styles.logo} resizeMode="contain" />
          </View>
          <Text style={[styles.title, { color: theme.text }]}>
            DevSnippets <Text style={[styles.highlightText, { color: theme.primary }]}>AI</Text>
          </Text>
        </View>

        <View style={styles.bottomContent}>
          <Text style={[styles.loadingText, { color: theme.subText }]}>INITIALIZING OFFLINE STORAGE ...</Text>
          <View
            style={[
              styles.progressBarBg,
              { backgroundColor: isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(15, 23, 42, 0.1)" },
            ]}
          >
            <View style={[styles.progressBarFill, { backgroundColor: theme.primary }]} />
          </View>

          <View style={styles.versionContainer}>
            <Text style={[styles.versionIcon, { color: theme.text }]}>[{">"}]</Text>
            <Text style={[styles.versionText, { color: theme.text }]}>v1.0.4_stable</Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default SplashScreen;

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  centerContent: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 60,
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 5,
  },
  logo: {
    width: 60,
    height: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    letterSpacing: -0.5,
  },
  highlightText: {
    color: "#6366f1",
  },
  bottomContent: {
    position: "absolute",
    bottom: 50,
    alignItems: "center",
    width: "100%",
  },
  loadingText: {
    fontSize: 10,
    fontWeight: "600",
    letterSpacing: 2,
    fontFamily: "monospace",
    marginBottom: 12,
  },
  progressBarBg: {
    width: width * 0.25,
    height: 3,
    borderRadius: 2,
    marginBottom: 24,
    overflow: "hidden",
  },
  progressBarFill: {
    width: "40%",
    height: "100%",
    borderRadius: 2,
  },
  versionContainer: {
    flexDirection: "row",
    alignItems: "center",
    opacity: 0.4,
  },
  versionIcon: {
    fontSize: 11,
    marginRight: 6,
    fontFamily: "monospace",
  },
  versionText: {
    fontSize: 12,
    letterSpacing: 1,
    fontFamily: "monospace",
  },
});
