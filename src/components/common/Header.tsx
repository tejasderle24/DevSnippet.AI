import { Text, View, StyleSheet, Image } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from "@/context/ThemeContext";



const Header = () => {

    const { theme } = useTheme();

    return (
        <View style={[styles.header, { borderBottomColor: theme.border }]}>
            <View style={styles.headerTitleContainer}>
                <Ionicons name="code-slash" size={22} color={theme.primary} style={styles.headerIcon} />
                <Text style={[styles.headerText, { color: theme.text }]}>DevSnippets AI</Text>
            </View>
            <Image
                source={{ uri: 'https://avatars.githubusercontent.com/u/180934001?v=4' }}
                style={[styles.topAvatar, { borderColor: theme.switchTrackOff }]}
            />
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderBottomWidth: 1,
    },
    headerTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerIcon: {
        marginRight: 8,
    },
    headerText: {
        fontSize: 18,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    topAvatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        borderWidth: 1,
    },
})