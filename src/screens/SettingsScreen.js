import React, { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { colors, type, radius, spacing } from '../theme/tokens'

function SettingsSection({ title, children }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionBody}>{children}</View>
    </View>
  )
}

function SwitchRow({ icon, title, subtitle, value, onValueChange, isLast }) {
  return (
    <View style={[styles.switchRow, !isLast && styles.rowDivider]}>
      <View style={styles.rowLeft}>
        <Ionicons name={icon} size={20} color={colors.accent} />
        <View style={styles.rowText}>
          <Text style={styles.rowTitle}>{title}</Text>
          <Text style={styles.rowSubtitle}>{subtitle}</Text>
        </View>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: colors.surfaceHigh, true: colors.accent }}
        thumbColor={colors.onAccent}
      />
    </View>
  )
}

function ClickableRow({ icon, title, subtitle, onPress, isLast, danger }) {
  return (
    <TouchableOpacity style={[styles.switchRow, !isLast && styles.rowDivider]} onPress={onPress}>
      <View style={styles.rowLeft}>
        <Ionicons name={icon} size={20} color={danger ? colors.error : colors.textSecondary} />
        <View style={styles.rowText}>
          <Text style={[styles.rowTitle, danger && { color: colors.error }]}>{title}</Text>
          {subtitle && <Text style={styles.rowSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      {!danger && <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />}
    </TouchableOpacity>
  )
}

export default function SettingsScreen({ navigation, onLogout }) {
  const [pushNotifications, setPushNotifications] = useState(true)
  const [messageAlerts, setMessageAlerts] = useState(true)
  const [publicProfile, setPublicProfile] = useState(true)
  const [dmFromAll, setDmFromAll] = useState(true)
  const [themeMode, setThemeMode] = useState('dark')

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation?.goBack()}>
          <Ionicons name="arrow-back" size={22} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>Settings</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.accountCard} onPress={() => navigation?.navigate('EditProfile')}>
          <View style={styles.accountAvatar} />
          <View style={styles.accountInfo}>
            <Text style={styles.accountName}>Your Name</Text>
            <Text style={styles.accountHandle}>@yourhandle</Text>
            <Text style={styles.editLink}>Edit profile details</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
        </TouchableOpacity>

        <SettingsSection title="Appearance">
          <View style={styles.themeRow}>
            {[{ key: 'dark', label: 'Dark' }, { key: 'light', label: 'Light' }, { key: 'system', label: 'System' }].map((mode) => (
              <TouchableOpacity
                key={mode.key}
                style={[styles.themeChip, themeMode === mode.key && styles.themeChipActive]}
                onPress={() => setThemeMode(mode.key)}
              >
                <Text style={[styles.themeChipText, themeMode === mode.key && styles.themeChipTextActive]}>
                  {mode.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </SettingsSection>

        <SettingsSection title="Notifications">
          <SwitchRow
            icon="notifications-outline"
            title="Push Notifications"
            subtitle="Alerts for likes, comments, and mentions"
            value={pushNotifications}
            onValueChange={setPushNotifications}
          />
          <SwitchRow
            icon="chatbubble-outline"
            title="Message Alerts"
            subtitle="Get notified about new messages"
            value={messageAlerts}
            onValueChange={setMessageAlerts}
            isLast
          />
        </SettingsSection>

        <SettingsSection title="Privacy">
          <SwitchRow
            icon="eye-outline"
            title="Public Profile"
            subtitle="Anyone can view your posts"
            value={publicProfile}
            onValueChange={setPublicProfile}
          />
          <SwitchRow
            icon="lock-closed-outline"
            title="Messages From Everyone"
            subtitle="Off means only people you follow can message you"
            value={dmFromAll}
            onValueChange={setDmFromAll}
            isLast
          />
        </SettingsSection>

        <SettingsSection title="About">
          <ClickableRow icon="information-circle-outline" title="About Vibeo" subtitle="Version 1.0.0" onPress={() => {}} />
          <ClickableRow icon="document-text-outline" title="Privacy Policy" onPress={() => {}} />
          <ClickableRow icon="reader-outline" title="Terms of Service" onPress={() => {}} isLast />
        </SettingsSection>

        <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
          <Ionicons name="log-out-outline" size={18} color={colors.error} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  topBar: {
    height: 56, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: spacing.lg, borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  topBarTitle: { ...type.headlineSm, color: colors.textPrimary },
  scroll: { padding: spacing.lg, gap: spacing.lg },
  accountCard: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.md, backgroundColor: colors.surface,
    borderRadius: radius.lg, padding: spacing.md, borderWidth: 1, borderColor: colors.border,
  },
  accountAvatar: { width: 52, height: 52, borderRadius: radius.full, backgroundColor: colors.surfaceHigh },
  accountInfo: { flex: 1 },
  accountName: { ...type.labelLg, color: colors.textPrimary },
  accountHandle: { ...type.bodySm, color: colors.textSecondary },
  editLink: { ...type.labelMd, color: colors.accent, marginTop: 2 },
  section: { gap: spacing.sm },
  sectionTitle: { ...type.labelMd, color: colors.textSecondary, marginLeft: spacing.xs },
  sectionBody: { backgroundColor: colors.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, overflow: 'hidden' },
  themeRow: { flexDirection: 'row', gap: spacing.sm, padding: spacing.md },
  themeChip: {
    flex: 1, height: 40, borderRadius: radius.md, alignItems: 'center', justifyContent: 'center',
    backgroundColor: colors.surfaceHigh, borderWidth: 1, borderColor: colors.border,
  },
  themeChipActive: { backgroundColor: colors.accent, borderColor: colors.accent },
  themeChipText: { ...type.labelMd, color: colors.textPrimary },
  themeChipTextActive: { color: colors.onAccent },
  switchRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: spacing.md },
  rowDivider: { borderBottomWidth: 1, borderBottomColor: colors.border },
  rowLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, flex: 1 },
  rowText: { flex: 1 },
  rowTitle: { ...type.labelLg, color: colors.textPrimary },
  rowSubtitle: { ...type.bodySm, color: colors.textSecondary, marginTop: 1 },
  logoutButton: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm,
    backgroundColor: colors.surfaceHigh, borderRadius: radius.md, height: 48,
  },
  logoutText: { ...type.labelLg, color: colors.error },
})
