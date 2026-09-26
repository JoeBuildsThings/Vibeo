import React, { useState, useMemo } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { colors, type, radius, spacing } from '../theme/tokens'

const TYPE_META = {
  like: { icon: 'heart', color: colors.error },
  comment: { icon: 'chatbubble', color: colors.accent },
  follow: { icon: 'person-add', color: colors.success },
  message: { icon: 'mail', color: '#8B5CF6' },
  mention: { icon: 'at', color: colors.amber },
}

const NOTIFICATIONS = [
  { id: '1', type: 'like', name: 'Sarah Jenkins', message: 'liked your post', time: '2m', unread: true, preview: 'Golden hour in the architectural district' },
  { id: '2', type: 'comment', name: 'Chidi Okafor', message: 'commented on your post', time: '1h', unread: true, preview: null },
  { id: '3', type: 'follow', name: 'Dele O.', message: 'started following you', time: '3h', unread: false, preview: null },
]

function NotificationRow({ item }) {
  const meta = TYPE_META[item.type]
  return (
    <TouchableOpacity style={[styles.row, item.unread && styles.rowUnread]}>
      <View style={styles.avatarWrap}>
        <View style={styles.avatar} />
        <View style={[styles.typeBadge, { backgroundColor: meta.color }]}>
          <Ionicons name={meta.icon} size={11} color={colors.onAccent} />
        </View>
      </View>
      <View style={styles.rowContent}>
        <View style={styles.rowTop}>
          <Text style={styles.rowName}>{item.name}</Text>
          <Text style={styles.rowTime}>{item.time}</Text>
        </View>
        <Text style={styles.rowMessage}>{item.message}</Text>
        {item.preview && (
          <View style={styles.previewBox}>
            <Text style={styles.previewText} numberOfLines={2}>{item.preview}</Text>
          </View>
        )}
      </View>
      {item.unread && <View style={styles.unreadDot} />}
    </TouchableOpacity>
  )
}

export default function NotificationsScreen({ navigation }) {
  const [tab, setTab] = useState('all')

  const filtered = useMemo(() => {
    if (tab === 'mentions') return NOTIFICATIONS.filter((n) => n.type === 'mention')
    return NOTIFICATIONS
  }, [tab])

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>Notifications</Text>
          <TouchableOpacity>
            <Text style={styles.markReadText}>Mark all as read</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.tabRow}>
          {[{ key: 'all', label: 'All Notifications' }, { key: 'mentions', label: 'Mentions' }].map((t) => (
            <TouchableOpacity
              key={t.key}
              style={[styles.tabChip, tab === t.key && styles.tabChipActive]}
              onPress={() => setTab(t.key)}
            >
              <Text style={[styles.tabText, tab === t.key && styles.tabTextActive]}>{t.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {filtered.length === 0 ? (
        <View style={styles.emptyState}>
          <View style={styles.emptyIcon}>
            <Ionicons name="checkmark-circle-outline" size={28} color={colors.accent} />
          </View>
          <Text style={styles.emptyTitle}>You're all caught up</Text>
          <Text style={styles.emptyText}>No new notifications right now. Check back later.</Text>
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <NotificationRow item={item} />}
          contentContainerStyle={styles.list}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: { paddingHorizontal: spacing.lg, paddingTop: spacing.md, paddingBottom: spacing.sm, borderBottomWidth: 1, borderBottomColor: colors.border },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md },
  headerTitle: { ...type.headlineLg, color: colors.textPrimary },
  markReadText: { ...type.labelMd, color: colors.accent },
  tabRow: { flexDirection: 'row', gap: spacing.sm },
  tabChip: { paddingHorizontal: spacing.md, paddingVertical: 6, borderRadius: radius.full, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  tabChipActive: { backgroundColor: colors.accent, borderColor: colors.accent },
  tabText: { ...type.labelMd, color: colors.textSecondary },
  tabTextActive: { color: colors.onAccent },
  list: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl },
  separator: { height: 1, backgroundColor: colors.border },
  row: { flexDirection: 'row', gap: spacing.md, paddingVertical: spacing.md, alignItems: 'flex-start' },
  rowUnread: { backgroundColor: 'rgba(91,141,239,0.06)' },
  avatarWrap: { position: 'relative' },
  avatar: { width: 44, height: 44, borderRadius: radius.full, backgroundColor: colors.surfaceHigh },
  typeBadge: {
    position: 'absolute', bottom: -2, right: -2, width: 20, height: 20, borderRadius: radius.full,
    alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: colors.background,
  },
  rowContent: { flex: 1 },
  rowTop: { flexDirection: 'row', justifyContent: 'space-between' },
  rowName: { ...type.labelLg, color: colors.textPrimary },
  rowTime: { ...type.bodySm, color: colors.textMuted },
  rowMessage: { ...type.bodyMd, color: colors.textSecondary, marginTop: 2 },
  previewBox: { backgroundColor: colors.surfaceHigh, borderRadius: radius.sm, padding: spacing.sm, marginTop: spacing.xs },
  previewText: { ...type.bodySm, color: colors.textSecondary },
  unreadDot: { width: 8, height: 8, borderRadius: radius.full, backgroundColor: colors.accent, marginTop: 6 },
  emptyState: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: spacing.xl, gap: spacing.sm },
  emptyIcon: {
    width: 56, height: 56, borderRadius: radius.full, backgroundColor: 'rgba(91,141,239,0.12)',
    alignItems: 'center', justifyContent: 'center', marginBottom: spacing.xs,
  },
  emptyTitle: { ...type.headlineSm, color: colors.textPrimary },
  emptyText: { ...type.bodyMd, color: colors.textSecondary, textAlign: 'center' },
})
