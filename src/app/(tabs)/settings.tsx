import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    TouchableOpacity,
    Switch,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

// Sub-components
import SectionHeader from '@/components/SectionHeader';
import SettingRow from '@/components/SettingRow';
import StorageProgressBar from '@/components/StorageProgressBar';

const SettingsScreen = () => {
    const [isDarkMode, setIsDarkMode] = useState(true);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style='auto' />
            {/* App Header */}
            <View style={styles.header}>
                <View style={styles.headerTitleContainer}>
                    <Ionicons name="code-slash" size={22} color="#8585FF" style={styles.headerIcon} />
                    <Text style={styles.headerText}>DevSnippets AI</Text>
                </View>
                <Image
                    source={{ uri: 'https://i.pravatar.cc/150?img=68' }} // Placeholder for user avatar
                    style={styles.topAvatar}
                />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                {/* ACCOUNT SECTION */}
                <SectionHeader title="ACCOUNT" />
                <TouchableOpacity style={styles.accountCard} activeOpacity={0.7}>
                    <View style={styles.accountInfo}>
                        <View style={styles.avatarContainer}>
                            <Image
                                source={{ uri: 'https://i.pravatar.cc/150?img=68' }}
                                style={styles.accountAvatar}
                            />
                            <View style={styles.activeStatusDot} />
                        </View>
                        <View style={styles.accountTextContainer}>
                            <Text style={styles.accountName}>Tejas Derle</Text>
                            <Text style={styles.accountEmail}>tejasderle.dev@snippets.ai</Text>
                        </View>
                    </View>
                    <Feather name="chevron-right" size={20} color="#8F8F94" />
                </TouchableOpacity>

                {/* APPEARANCE SECTION */}
                <SectionHeader title="APPEARANCE" />
                <View style={styles.groupedRowsContainer}>
                    <SettingRow
                        icon={<Feather name="moon" size={18} color="#A3A3A3" />}
                        title="Dark Mode"
                        rightElement={
                            <Switch
                                value={isDarkMode}
                                onValueChange={setIsDarkMode}
                                trackColor={{ false: '#3A3A3C', true: '#5E5CE6' }}
                                thumbColor="#FFFFFF"
                            />
                        }
                    />
                    <View style={styles.separator} />
                    <SettingRow
                        icon={<Ionicons name="color-palette-outline" size={18} color="#A3A3A3" />}
                        title="Syntax Highlighting"
                        rightElement={
                            <TouchableOpacity style={styles.valueSelector}>
                                <Text style={styles.selectorText}>One Dark</Text>
                                <Feather name="chevron-right" size={16} color="#8F8F94" />
                            </TouchableOpacity>
                        }
                    />
                </View>

                {/* STORAGE SECTION */}
                <SectionHeader title="STORAGE" />
                <View style={styles.storageCard}>
                    <View style={styles.storageHeaderRow}>
                        <Text style={styles.storageTitle}>42.5 MB of 1 GB used</Text>
                        <Text style={styles.storagePercentage}>4.2%</Text>
                    </View>
                    <Text style={styles.storageSubtitle}>1,248 Snippets stored locally</Text>

                    <StorageProgressBar progress={0.042} />

                    <View style={styles.legendContainer}>
                        <View style={styles.legendItem}>
                            <View style={[styles.legendDot, { backgroundColor: '#5E5CE6' }]} />
                            <Text style={styles.legendText}>Code</Text>
                        </View>
                        <View style={styles.legendItem}>
                            <View style={[styles.legendDot, { backgroundColor: '#8E8E93' }]} />
                            <Text style={styles.legendText}>Metadata</Text>
                        </View>
                    </View>
                </View>

                {/* DATA & BACKUP SECTION */}
                <SectionHeader title="DATA & BACKUP" />
                <View style={styles.groupedRowsContainer}>
                    <SettingRow
                        icon={<Ionicons name="document-text-outline" size={18} color="#A3A3A3" />}
                        title="Export All Snippets"
                        rightElement={<Feather name="download" size={18} color="#A3A3A3" />}
                    />
                    <View style={styles.separator} />
                    <SettingRow
                        icon={<Ionicons name="cloud-upload-outline" size={18} color="#A3A3A3" />}
                        title="Backup to Cloud"
                        rightElement={<Ionicons name="refresh" size={18} color="#A3A3A3" />}
                    />
                    <View style={styles.separator} />
                    <SettingRow
                        icon={<Ionicons name="trash-outline" size={18} color="#FF453A" />}
                        title="Clear Local Storage"
                        titleStyle={{ color: '#FF453A' }}
                    />
                </View>

                {/* ABOUT SECTION */}
                <SectionHeader title="ABOUT" />
                <View style={styles.groupedRowsContainer}>
                    <SettingRow
                        title="Version"
                        rightElement={<Text style={styles.versionText}>2.4.0-stable</Text>}
                    />
                    <View style={styles.separator} />
                    <SettingRow
                        title="Terms of Service"
                        rightElement={<Feather name="external-link" size={16} color="#8F8F94" />}
                    />
                    <View style={styles.separator} />
                    <SettingRow
                        title="Privacy Policy"
                        rightElement={<Feather name="external-link" size={16} color="#8F8F94" />}
                    />
                </View>

                {/* Footer */}
                <View style={styles.footerContainer}>
                    <Text style={styles.footerText}>Made with 🤍 for developers</Text>
                    <View style={styles.footerIcons}>
                        <Ionicons name="laptop-outline" size={18} color="#636366" style={{ marginRight: 12 }} />
                        <Ionicons name="git-branch-outline" size={18} color="#636366" style={{ marginRight: 12 }} />
                        <Ionicons name="code-outline" size={18} color="#636366" />
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

export default SettingsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0A0A0C', // Deep premium dark background
    },
    scrollContent: {
        paddingHorizontal: 16,
        paddingBottom: 40,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#1C1C1E',
    },
    headerTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerIcon: {
        marginRight: 8,
    },
    headerText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    topAvatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#3A3A3C',
    },
    accountCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#121214',
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#1C1C1E',
    },
    accountInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarContainer: {
        position: 'relative',
    },
    accountAvatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
    },
    activeStatusDot: {
        position: 'absolute',
        bottom: 0,
        right: 2,
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#30D158',
        borderWidth: 2,
        borderColor: '#121214',
    },
    accountTextContainer: {
        marginLeft: 14,
    },
    accountName: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    accountEmail: {
        color: '#8E8E93',
        fontSize: 13,
        marginTop: 2,
    },
    groupedRowsContainer: {
        backgroundColor: '#121214',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#1C1C1E',
        overflow: 'hidden',
    },
    separator: {
        height: 1,
        backgroundColor: '#1C1C1E',
        marginLeft: 16,
    },
    valueSelector: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    selectorText: {
        color: '#8E8E93',
        marginRight: 6,
        fontSize: 14,
    },
    storageCard: {
        backgroundColor: '#121214',
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#1C1C1E',
    },
    storageHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    storageTitle: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '600',
    },
    storagePercentage: {
        color: '#5E5CE6',
        fontSize: 12,
        fontWeight: '600',
    },
    storageSubtitle: {
        color: '#8E8E93',
        fontSize: 13,
        marginTop: 4,
        marginBottom: 14,
    },
    legendContainer: {
        flexDirection: 'row',
        marginTop: 12,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 16,
    },
    legendDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 6,
    },
    legendText: {
        color: '#8E8E93',
        fontSize: 12,
    },
    versionText: {
        color: '#8E8E93',
        fontSize: 14,
    },
    footerContainer: {
        alignItems: 'center',
        marginTop: 32,
        marginBottom: 16,
    },
    footerText: {
        color: '#636366',
        fontSize: 13,
        marginBottom: 8,
    },
    footerIcons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});
