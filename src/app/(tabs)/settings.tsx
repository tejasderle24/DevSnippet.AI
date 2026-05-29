import React from 'react';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
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
import SectionHeader from '@/components/settings/SectionHeader';
import SettingRow from '@/components/settings/SettingRow';
import StorageProgressBar from '@/components/settings/StorageProgressBar';
import Header from '@/components/common/Header';
import { useTheme } from '@/context/ThemeContext';

const SettingsScreen = () => {
  const { theme, isDarkMode, toggleTheme } = useTheme();
  const router = useRouter();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />

      {/* TopHeader */}
      <Header />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <SectionHeader title="ACCOUNT" textStyle={{ color: theme.mutedText }} />
        <TouchableOpacity
          style={[styles.accountCard, { backgroundColor: theme.card, borderColor: theme.border }]}
          activeOpacity={0.7}
        >
          <View style={styles.accountInfo}>
            <View style={styles.avatarContainer}>
              <Image source={{ uri: 'https://avatars.githubusercontent.com/u/180934001' }} style={styles.accountAvatar} />
              <View style={[styles.activeStatusDot, { backgroundColor: theme.success, borderColor: theme.card }]} />
            </View>
            <View style={styles.accountTextContainer}>
              <Text style={[styles.accountName, { color: theme.text }]}>Tejas Derle</Text>
              <Text style={[styles.accountEmail, { color: theme.subText }]}>tejasderle.dev@snippets.ai</Text>
            </View>
          </View>
          <Feather name="chevron-right" size={20} color={theme.subText} />
        </TouchableOpacity>

        <SectionHeader title="API Configuration" textStyle={{ color: theme.mutedText }} />
        <TouchableOpacity
          style={[styles.groupedRowsContainer, { backgroundColor: theme.card, borderColor: theme.border }]}
          onPress={() => router.push("./manage-api-keys")}
          activeOpacity={0.7}
        >
          <SettingRow
            icon={<Ionicons name="key-outline" size={18} color={theme.icon} />}
            title="Manage API Keys"
            titleStyle={{ color: theme.text }}
            rightElement={<Feather name="chevron-right" size={18} color={theme.icon} />}
          />
        
        </TouchableOpacity>

        <SectionHeader title="APPEARANCE" textStyle={{ color: theme.mutedText }} />
        <View style={[styles.groupedRowsContainer, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <SettingRow
            icon={<Feather name="moon" size={18} color={theme.icon} />}
            title="Dark Mode"
            titleStyle={{ color: theme.text }}
            rightElement={
              <Switch
                value={isDarkMode}
                onValueChange={toggleTheme}
                trackColor={{
                  false: theme.switchTrackOff,
                  true: theme.switchTrackOn,
                }}
                thumbColor={theme.switchThumb}
              />
            }
          />
          <View style={[styles.separator, { backgroundColor: theme.separator }]} />
        </View>

        <SectionHeader title="STORAGE" textStyle={{ color: theme.mutedText }} />
        <View style={[styles.storageCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <View style={styles.storageHeaderRow}>
            <Text style={[styles.storageTitle, { color: theme.text }]}>42.5 MB of 1 GB used</Text>
            <Text style={[styles.storagePercentage, { color: theme.primary }]}>4.2%</Text>
          </View>
          <Text style={[styles.storageSubtitle, { color: theme.subText }]}>1,248 Snippets stored locally</Text>

          <StorageProgressBar progress={0.042} />

          <View style={styles.legendContainer}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: theme.primary }]} />
              <Text style={[styles.legendText, { color: theme.subText }]}>Code</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: theme.subText }]} />
              <Text style={[styles.legendText, { color: theme.subText }]}>Metadata</Text>
            </View>
          </View>
        </View>

        <SectionHeader title="DATA & BACKUP" textStyle={{ color: theme.mutedText }} />
        <View style={[styles.groupedRowsContainer, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <SettingRow
            icon={<Ionicons name="document-text-outline" size={18} color={theme.icon} />}
            title="Export All Snippets"
            titleStyle={{ color: theme.text }}
            rightElement={<Feather name="download" size={18} color={theme.icon} />}
          />
          <View style={[styles.separator, { backgroundColor: theme.separator }]} />
          <View style={[styles.separator, { backgroundColor: theme.separator }]} />
          <SettingRow
            icon={<Ionicons name="trash-outline" size={18} color={theme.danger} />}
            title="Clear Local Storage"
            titleStyle={{ color: theme.danger }}
          />
        </View>

        <SectionHeader title="ABOUT" textStyle={{ color: theme.mutedText }} />
        <View style={[styles.groupedRowsContainer, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <SettingRow
            title="Version"
            titleStyle={{ color: theme.text }}
            rightElement={<Text style={[styles.versionText, { color: theme.subText }]}>1.0.0-stable</Text>}
          />
          <View style={[styles.separator, { backgroundColor: theme.separator }]} />
          <SettingRow
            title="Terms of Service"
            titleStyle={{ color: theme.text }}
            rightElement={<Feather name="external-link" size={16} color={theme.subText} />}
          />
          <View style={[styles.separator, { backgroundColor: theme.separator }]} />
          <SettingRow
            title="Privacy Policy"
            titleStyle={{ color: theme.text }}
            rightElement={<Feather name="external-link" size={16} color={theme.subText} />}
          />
        </View>

        <View style={styles.footerContainer}>
          <Text style={[styles.footerText, { color: theme.mutedText }]}>Made by Tejas Derle</Text>
          <View style={styles.footerIcons}>
            <Ionicons name="laptop-outline" size={18} color={theme.mutedText} style={{ marginRight: 12 }} />
            <Ionicons name="git-branch-outline" size={18} color={theme.mutedText} style={{ marginRight: 12 }} />
            <Ionicons name="code-outline" size={18} color={theme.mutedText} />
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
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  accountCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
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
    borderWidth: 2,
  },
  accountTextContainer: {
    marginLeft: 14,
  },
  accountName: {
    fontSize: 16,
    fontWeight: '600',
  },
  accountEmail: {
    fontSize: 13,
    marginTop: 2,
  },
  groupedRowsContainer: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  separator: {
    height: 1,
    marginLeft: 16,
  },
  valueSelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectorText: {
    marginRight: 6,
    fontSize: 14,
  },
  storageCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  storageHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  storageTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  storagePercentage: {
    fontSize: 12,
    fontWeight: '600',
  },
  storageSubtitle: {
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
    fontSize: 12,
  },
  versionText: {
    fontSize: 14,
  },
  footerContainer: {
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 16,
  },
  footerText: {
    fontSize: 13,
    marginBottom: 8,
  },
  footerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
