import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { colors, type, radius, spacing } from '../theme/tokens'

const CHATS = [
  { id: '1', name: 'Sarah Jenkins', message: 'Hey, are the design tokens ready for review?', time: '10:42 AM', unread: 2, online: true },
  { id: '2', name: 'Dev Team Sprint', message: 'Deploy is scheduled for 6pm', time: '9:15 AM', unread: 0, online: false },
  { id: '3', name: 'Chidi Okafor', message: 'Sent you the file', time: 'Yesterday', unread: 0, online: true },
]

const FILTERS = ['All', 'Unread', 'Groups', 'Archived']

function ChatRow({ chat, onPress }) {
  return (
    <TouchableOpacity style={styles.chatRow} onPress={onPress}>
      <View style={styles.avatarWrap}>
        <View style={styles.avatar} />
        {chat.online && <View style={styles.onlineDot} />}
      </View>
      <View style={styles.chatContent}>
        <View style={styles.chatTopLine}>
          <Text style={styles.chatName}>{chat.name}</Text>
          <Text style={styles.chatTime}>{chat.time}</Text>
        </View>
        <View style={styles.chatBottomLine}>
          <Text style={styles.chatMessage} numberOfLines={1}>{chat.message}</Text>
          {chat.unread > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>{chat.unread}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default function ChatsScreen({ navigation }) {
  const [activeFilter, setActiveFilter] = useState('All')

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.topBar}>
        <Text style={styles.logo}>Vibeo</Text>
        <View style={styles.avatarSm} />
      </View>

      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>Chats</Text>
          <View style={styles.activeBadge}>
            <Text style={styles.activeBadgeText}>{CHATS.length} Active</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.newChatButton}>
          <Ionicons name="add" size={20} color={colors.onAccent} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchBar}>
        <Ionicons name="search" size={18} color={colors.textMuted} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search people or chats..."
          placeholderTextColor={colors.textMuted}
        />
      </View>

      <View style={styles.filterRow}>
        {FILTERS.map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[styles.filterChip, activeFilter === filter && styles.filterChipActive]}
            onPress={() => setActiveFilter(filter)}
          >
            <Text style={[styles.filterText, activeFilter === filter && styles.filterTextActive]}>
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={CHATS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ChatRow chat={item} onPress={() => navigation?.navigate('ChatConversation', { name: item.name })} />
        )}
        contentContainerStyle={styles.chatList}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
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
  headerRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: spacing.lg, paddingTop: spacing.md, paddingBottom: spacing.sm,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  headerTitle: { ...type.headlineLg, color: colors.textPrimary },
  activeBadge: { backgroundColor: colors.surfaceHigh, borderRadius: radius.full, paddingHorizontal: spacing.sm, paddingVertical: 2 },
  activeBadgeText: { ...type.labelSm, color: colors.accent },
  newChatButton: {
    width: 40, height: 40, borderRadius: radius.full, backgroundColor: colors.accent,
    alignItems: 'center', justifyContent: 'center',
  },
  searchBar: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.sm, backgroundColor: colors.surface,
    borderRadius: radius.md, height: 44, paddingHorizontal: spacing.md,
    marginHorizontal: spacing.lg, marginBottom: spacing.sm, borderWidth: 1, borderColor: colors.border,
  },
  searchInput: { flex: 1, ...type.bodyMd, color: colors.textPrimary },
  filterRow: { flexDirection: 'row', gap: spacing.xs, paddingHorizontal: spacing.lg, paddingBottom: spacing.sm },
  filterChip: {
    paddingHorizontal: spacing.md, paddingVertical: 6, borderRadius: radius.full,
    backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border,
  },
  filterChipActive: { backgroundColor: colors.accent, borderColor: colors.accent },
  filterText: { ...type.labelMd, color: colors.textSecondary },
  filterTextActive: { color: colors.onAccent },
  chatList: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl },
  separator: { height: 1, backgroundColor: colors.border, marginVertical: spacing.xs },
  chatRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: spacing.sm },
  avatarWrap: { position: 'relative' },
  avatar: { width: 52, height: 52, borderRadius: radius.full, backgroundColor: colors.surfaceHigh },
  onlineDot: {
    position: 'absolute', bottom: 1, right: 1, width: 12, height: 12, borderRadius: radius.full,
    backgroundColor: colors.online, borderWidth: 2, borderColor: colors.background,
  },
  chatContent: { flex: 1 },
  chatTopLine: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 },
  chatName: { ...type.labelLg, color: colors.textPrimary },
  chatTime: { ...type.labelSm, color: colors.accent },
  chatBottomLine: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: spacing.sm },
  chatMessage: { ...type.bodyMd, color: colors.textSecondary, flex: 1 },
  unreadBadge: {
    minWidth: 20, height: 20, borderRadius: radius.full, backgroundColor: colors.accent,
    alignItems: 'center', justifyContent: 'center', paddingHorizontal: 6,
  },
  unreadText: { ...type.labelSm, color: colors.onAccent },
})
