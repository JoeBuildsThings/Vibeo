import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  Alert,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { colors, type, radius, spacing } from '../theme/tokens'

const STORIES = [
  { id: '1', name: 'Aria Vance', isAdd: false },
  { id: '2', name: 'Dele O.', isAdd: false },
  { id: '3', name: 'Chidi K.', isAdd: false },
]

const POSTS = [
  {
    id: '1',
    author: 'Marcus Vance',
    time: '2h',
    text: 'Golden hour in the architectural district. Perfect shadows and crisp geometry today.',
    likes: 389,
    comments: 44,
    shares: 19,
  },
]

function PostCard({ post }) {
  const [liked, setLiked] = useState(false)
  return (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <View style={styles.avatarSm} />
        <View style={styles.postHeaderText}>
          <Text style={styles.postAuthor}>{post.author}</Text>
          <Text style={styles.postTime}>{post.time} ago</Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="ellipsis-horizontal" size={20} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <Text style={styles.postText}>{post.text}</Text>

      <View style={styles.postImage} />

      <View style={styles.engagementRow}>
        <View style={styles.engagementLeft}>
          <View style={styles.likeBadge}>
            <Ionicons name="heart" size={11} color={colors.onAccent} />
          </View>
          <Text style={styles.engagementCount}>{post.likes}</Text>
        </View>
        <Text style={styles.engagementMeta}>
          {post.comments} comments · {post.shares} shares
        </Text>
      </View>

      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.actionButton} onPress={() => setLiked(!liked)}>
          <Ionicons
            name={liked ? 'thumbs-up' : 'thumbs-up-outline'}
            size={18}
            color={liked ? colors.accent : colors.textSecondary}
          />
          <Text style={[styles.actionText, liked && { color: colors.accent }]}>Like</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="chatbubble-outline" size={18} color={colors.textSecondary} />
          <Text style={styles.actionText}>Comment</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => Alert.alert('Shared', 'Post shared to your story.')}
        >
          <Ionicons name="share-outline" size={18} color={colors.textSecondary} />
          <Text style={styles.actionText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default function FeedScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.topBar}>
        <Text style={styles.logo}>Vibeo</Text>
        <View style={styles.topBarRight}>
          <TouchableOpacity onPress={() => navigation?.navigate('Notifications')}>
            <Ionicons name="notifications-outline" size={22} color={colors.textPrimary} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation?.navigate('Settings')}>
            <View style={styles.avatarSm} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.flex} showsVerticalScrollIndicator={false}>
        <View style={styles.searchRow}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={18} color={colors.textMuted} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search Vibeo or tag people..."
              placeholderTextColor={colors.textMuted}
            />
          </View>
          <TouchableOpacity
            style={styles.composeButton}
            onPress={() => Alert.alert('Create Post', 'Post composer coming once backend is wired up.')}
          >
            <Ionicons name="add" size={22} color={colors.accent} />
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.storiesRail}
          contentContainerStyle={styles.storiesContent}
        >
          <View style={styles.storyCard}>
            <View style={styles.storyAddCircle}>
              <Ionicons name="add" size={20} color={colors.onAccent} />
            </View>
            <Text style={styles.storyLabel}>Add Story</Text>
          </View>
          {STORIES.map((story) => (
            <View key={story.id} style={styles.storyCardFilled}>
              <Text style={styles.storyName} numberOfLines={1}>{story.name}</Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.feedList}>
          {POSTS.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  flex: { flex: 1 },
  topBar: {
    height: 56, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: spacing.lg, borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  logo: { ...type.headlineSm, color: colors.textPrimary },
  topBarRight: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  avatarSm: { width: 32, height: 32, borderRadius: radius.full, backgroundColor: colors.surfaceHigh },
  searchRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  searchBar: {
    flex: 1, flexDirection: 'row', alignItems: 'center', gap: spacing.sm,
    backgroundColor: colors.surface, borderRadius: radius.lg, height: 40, paddingHorizontal: spacing.md,
    borderWidth: 1, borderColor: colors.border,
  },
  searchInput: { flex: 1, ...type.bodySm, color: colors.textPrimary },
  composeButton: {
    width: 40, height: 40, borderRadius: radius.lg, backgroundColor: colors.surface,
    alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.border,
  },
  storiesRail: { paddingVertical: spacing.xs },
  storiesContent: { paddingHorizontal: spacing.lg, gap: spacing.md },
  storyCard: {
    width: 96, height: 150, borderRadius: radius.lg, backgroundColor: colors.surface,
    alignItems: 'center', justifyContent: 'center', gap: spacing.sm, borderWidth: 1, borderColor: colors.border,
  },
  storyAddCircle: {
    width: 40, height: 40, borderRadius: radius.full, backgroundColor: colors.accent,
    alignItems: 'center', justifyContent: 'center',
  },
  storyLabel: { ...type.labelSm, color: colors.textPrimary },
  storyCardFilled: {
    width: 96, height: 150, borderRadius: radius.lg, backgroundColor: colors.surfaceHigh,
    justifyContent: 'flex-end', padding: spacing.sm,
  },
  storyName: { ...type.labelSm, color: colors.textPrimary },
  feedList: { paddingHorizontal: spacing.lg, paddingTop: spacing.md, paddingBottom: spacing.xxl, gap: spacing.lg },
  postCard: {
    backgroundColor: colors.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border,
    padding: spacing.lg,
  },
  postHeader: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.md },
  postHeaderText: { flex: 1 },
  postAuthor: { ...type.labelLg, color: colors.textPrimary },
  postTime: { ...type.bodySm, color: colors.textMuted },
  postText: { ...type.bodyMd, color: colors.textPrimary, marginBottom: spacing.md, lineHeight: 21 },
  postImage: { width: '100%', height: 220, borderRadius: radius.md, backgroundColor: colors.surfaceHigh, marginBottom: spacing.md },
  engagementRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingVertical: spacing.xs, marginBottom: spacing.xs,
  },
  engagementLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  likeBadge: {
    width: 20, height: 20, borderRadius: radius.full, backgroundColor: colors.accent,
    alignItems: 'center', justifyContent: 'center',
  },
  engagementCount: { ...type.bodySm, color: colors.textSecondary },
  engagementMeta: { ...type.bodySm, color: colors.textSecondary },
  actionRow: {
    flexDirection: 'row', borderTopWidth: 1, borderTopColor: colors.border, paddingTop: spacing.sm, marginTop: spacing.xs,
  },
  actionButton: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.xs, paddingVertical: spacing.sm },
  actionText: { ...type.labelMd, color: colors.textSecondary },
})
