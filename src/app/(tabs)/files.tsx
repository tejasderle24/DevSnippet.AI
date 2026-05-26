import { StatusBar } from "expo-status-bar";
import { Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/common/Header";
import { useTheme } from "@/context/ThemeContext";


export default function FilesScreen() {
const { theme, isDarkMode } = useTheme();
  
  return (
       <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
         <StatusBar style={isDarkMode ? 'light' : 'dark'} />
         {/* TopHeader */}
         <Header />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
