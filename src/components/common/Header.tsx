import { Text, View, StyleSheet, Image, useColorScheme } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { darkTheme, lightTheme } from "@/constants/theme";



const Header = () => {

    const colorScheme = useColorScheme() ?? 'dark';
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

    return (
        <View style={[styles.header, { borderBottomColor: theme.border }]}>
            <View style={styles.headerTitleContainer}>
                <Ionicons name="code-slash" size={22} color={theme.primary} style={styles.headerIcon} />
                <Text style={[styles.headerText, { color: theme.text }]}>DevSnippets AI</Text>
            </View>
            <Image
                source={{ uri: 'https://i.pravatar.cc/150?img=68' }}
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