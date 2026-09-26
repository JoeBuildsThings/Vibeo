import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { colors, type, radius, spacing } from '../theme/tokens'

export default function ErrorScreen({
  title = 'Something went wrong',
  message = 'We could not load this. Check your connection and try again.',
  onRetry,
  navigation,
}) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.iconCircle}>
          <Ionicons name="alert-circle-outline" size={40} color={colors.error} />
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>

        {onRetry && (
          <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
            <Ionicons name="refresh" size={16} color={colors.onAccent} />
            <Text style={styles.retryText}>Try Again</Text>
          </TouchableOpacity>
        )}

        {navigation && (
          <TouchableOpacity
            style={styles.homeLink}
            onPress={() => navigation.navigate('Feed')}
          >
            <Text style={styles.homeLinkText}>Back to Feed</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: spacing.xl },
  iconCircle: {
    width: 88, height: 88, borderRadius: radius.full, backgroundColor: colors.surface,
    alignItems: 'center', justifyContent: 'center', marginBottom: spacing.lg,
    borderWidth: 1, borderColor: colors.border,
  },
  title: { ...type.headlineMd, color: colors.textPrimary, marginBottom: spacing.sm, textAlign: 'center' },
  message: { ...type.bodyMd, color: colors.textSecondary, textAlign: 'center', marginBottom: spacing.xl, lineHeight: 21 },
  retryButton: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.sm, backgroundColor: colors.accent,
    borderRadius: radius.md, paddingHorizontal: spacing.xl, height: 48,
  },
  retryText: { ...type.labelLg, color: colors.onAccent },
  homeLink: { marginTop: spacing.lg },
  homeLinkText: { ...type.labelMd, color: colors.textSecondary },
})
