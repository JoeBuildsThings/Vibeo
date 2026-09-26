import React, { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { colors, type, radius, spacing } from '../theme/tokens'

const TABS = ['Posts', 'Photos', 'About']

export default function ProfileScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('Posts')

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.topBar}>
        <Text style={styles.logo}>Vibeo</Text>
        <View style={styles.avatarSm} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.handleRow}>
          <View style={styles.handleLeft}>
            <Text style={styles.handle}>@marcusvance</Text>
            <Ionicons name="checkmark-circle" size={16} color={colors.accent} />
          </View>
          <View style={styles.handleActions}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="share-outline" size={18} color={colors.textPrimary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="ellipsis-horizontal" size={18} color={colors.textPrimary} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.coverPhoto} />

        <View style={styles.avatarRow}>
          <View style={styles.avatarLarge}>
            <View style={styles.onlineDot} />
          </View>
          <View style={styles.statusBadge}>
            <Ionicons name="flash" size={12} color={colors.amber} />
            <Text style={styles.statusText}>Deep Work Mode</Text>
          </View>
        </View>

        <View style={styles.bioBlock}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>Marcus Vance</Text>
            <View style={styles.proBadge}>
              <Text style={styles.proBadgeText}>PRO</Text>
            </View>
          </View>
          <Text style={styles.username}>@marcusv</Text>
          <Text style={styles.bio}>
            Senior Product Designer and Systems Architect. Building minimal, dark mode first interfaces.
          </Text>
          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Ionicons name="location-outline" size={14} color={colors.accent} />
              <Text style={styles.metaText}>San Francisco, CA</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="link-outline" size={14} color={colors.textSecondary} />
              <Text style={styles.metaLink}>marcusv.design</Text>
            </View>
          </View>
        </View>

        <View style={styles.statsBar}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>1,420</Text>
            <Text style={styles.statLabel}>FOLLOWERS</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>580</Text>
            <Text style={styles.statLabel}>FOLLOWING</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>84</Text>
            <Text style={styles.statLabel}>POSTS</Text>
          </View>
        </View>

        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.primaryAction}>
            <Ionicons name="create-outline" size={16} color={colors.onAccent} />
            <Text style={styles.primaryActionText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryAction}>
            <Ionicons name="paper-plane-outline" size={16} color={colors.textPrimary} />
            <Text style={styles.secondaryActionText}>Share Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.tabsRow}>
          {TABS.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={styles.tabButton}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>{tab}</Text>
              {activeTab === tab && <View style={styles.tabIndicator} />}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.tabPanel}>
          <Text style={styles.emptyStateText}>
            {activeTab} content shows here once posts are wired up.
          </Text>
        </View>
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
  logo: { ...type.headlineSm, color: colors.textPrimary },
  avatarSm: { width: 32, height: 32, borderRadius: radius.full, backgroundColor: colors.surfaceHigh },
  handleRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: spacing.lg, paddingVertical: spacing.sm, backgroundColor: colors.surfaceLow,
  },
  handleLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  handle: { ...type.headlineSm, color: colors.textPrimary },
  handleActions: { flexDirection: 'row', gap: spacing.xs },
  iconButton: {
    width: 36, height: 36, borderRadius: radius.md, backgroundColor: colors.surface,
    alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.border,
  },
  coverPhoto: { width: '100%', height: 130, backgroundColor: colors.surfaceHigh },
  avatarRow: {
    flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between',
    paddingHorizontal: spacing.lg, marginTop: -44,
  },
  avatarLarge: {
    width: 88, height: 88, borderRadius: radius.full, backgroundColor: colors.surfaceHigh,
    borderWidth: 3, borderColor: colors.background, justifyContent: 'flex-end', alignItems: 'flex-end',
  },
  onlineDot: {
    width: 16, height: 16, borderRadius: radius.full, backgroundColor: colors.online,
    borderWidth: 3, borderColor: colors.background,
  },
  statusBadge: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.xs, backgroundColor: colors.surfaceHigh,
    borderRadius: radius.full, paddingHorizontal: spacing.sm, paddingVertical: 5, marginBottom: spacing.xs,
  },
  statusText: { ...type.labelSm, color: colors.textSecondary },
  bioBlock: { paddingHorizontal: spacing.lg, paddingTop: spacing.sm, gap: 3 },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  name: { ...type.headlineMd, color: colors.textPrimary },
  proBadge: { backgroundColor: colors.surfaceHighest, borderRadius: 4, paddingHorizontal: 5, paddingVertical: 2 },
  proBadgeText: { ...type.labelSm, color: colors.accent, letterSpacing: 0.5 },
  username: { ...type.labelMd, color: colors.textSecondary },
  bio: { ...type.bodyMd, color: colors.textPrimary, marginTop: spacing.xs, lineHeight: 20 },
  metaRow: { flexDirection: 'row', gap: spacing.md, marginTop: spacing.xs },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { ...type.labelMd, color: colors.textSecondary },
  metaLink: { ...type.labelMd, color: colors.accent },
  statsBar: {
    flexDirection: 'row', backgroundColor: colors.surfaceLow, borderRadius: radius.lg,
    marginHorizontal: spacing.lg, marginTop: spacing.lg, padding: spacing.md,
  },
  statItem: { flex: 1, alignItems: 'center' },
  statNumber: { ...type.headlineSm, color: colors.textPrimary },
  statLabel: { ...type.labelSm, color: colors.textSecondary, marginTop: 2, letterSpacing: 0.5 },
  statDivider: { width: 1, backgroundColor: colors.border },
  actionsRow: { flexDirection: 'row', gap: spacing.sm, paddingHorizontal: spacing.lg, marginTop: spacing.lg },
  primaryAction: {
    flex: 1, height: 44, borderRadius: radius.md, backgroundColor: colors.accent,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.xs,
  },
  primaryActionText: { ...type.labelLg, color: colors.onAccent },
  secondaryAction: {
    flex: 1, height: 44, borderRadius: radius.md, backgroundColor: colors.surfaceHigh,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.xs,
  },
  secondaryActionText: { ...type.labelLg, color: colors.textPrimary },
  tabsRow: {
    flexDirection: 'row', gap: spacing.lg, paddingHorizontal: spacing.lg, marginTop: spacing.xl,
    backgroundColor: colors.surfaceLow, borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  tabButton: { paddingVertical: spacing.sm, alignItems: 'center' },
  tabText: { ...type.labelLg, color: colors.textSecondary },
  tabTextActive: { color: colors.accent },
  tabIndicator: { height: 2, backgroundColor: colors.accent, borderRadius: 1, width: '100%', marginTop: spacing.xs },
  tabPanel: { padding: spacing.xl, alignItems: 'center' },
  emptyStateText: { ...type.bodyMd, color: colors.textMuted, textAlign: 'center' },
})
