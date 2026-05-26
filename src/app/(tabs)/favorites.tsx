import { StatusBar } from "expo-status-bar";
import { Text, View, StyleSheet, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { darkTheme, lightTheme } from "@/constants/theme";
import Header from "@/components/common/Header";


export default function FavoritesScreen() {
    const colorScheme = useColorScheme() ?? 'dark';
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
    const isDarkMode = colorScheme === 'dark';
  
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
