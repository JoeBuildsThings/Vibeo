import React, { useState, useRef } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { colors, type, radius, spacing } from '../theme/tokens'

const INITIAL_MESSAGES = [
  { id: '1', text: 'Hey, are the design tokens ready for review?', fromMe: false, time: '10:40 AM' },
  { id: '2', text: 'Yeah just pushed them, check the tokens file', fromMe: true, time: '10:41 AM' },
  { id: '3', text: 'Perfect, looking now', fromMe: false, time: '10:42 AM' },
]

function MessageBubble({ message }) {
  return (
    <View style={[styles.bubbleRow, message.fromMe && styles.bubbleRowMe]}>
      <View style={[styles.bubble, message.fromMe ? styles.bubbleMe : styles.bubbleThem]}>
        <Text style={[styles.bubbleText, message.fromMe && styles.bubbleTextMe]}>{message.text}</Text>
      </View>
      <Text style={[styles.bubbleTime, message.fromMe && styles.bubbleTimeMe]}>{message.time}</Text>
    </View>
  )
}

export default function ChatConversationScreen({ route, navigation }) {
  const name = route?.params?.name || 'Chat'
  const [messages, setMessages] = useState(INITIAL_MESSAGES)
  const [draft, setDraft] = useState('')
  const listRef = useRef(null)

  const sendMessage = () => {
    if (!draft.trim()) return
    const newMessage = {
      id: Date.now().toString(),
      text: draft.trim(),
      fromMe: true,
      time: 'Now',
    }
    setMessages((prev) => [...prev, newMessage])
    setDraft('')
    setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 50)
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation?.goBack()}>
          <Ionicons name="arrow-back" size={22} color={colors.textPrimary} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <View style={styles.headerAvatar} />
          <View>
            <Text style={styles.headerName}>{name}</Text>
            <Text style={styles.headerStatus}>Active now</Text>
          </View>
        </View>
        <TouchableOpacity>
          <Ionicons name="ellipsis-horizontal" size={20} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <MessageBubble message={item} />}
          contentContainerStyle={styles.messageList}
          onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: false })}
        />

        <View style={styles.inputBar}>
          <TouchableOpacity style={styles.attachButton}>
            <Ionicons name="add" size={22} color={colors.textSecondary} />
          </TouchableOpacity>
          <TextInput
            style={styles.textInput}
            placeholder="Message..."
            placeholderTextColor={colors.textMuted}
            value={draft}
            onChangeText={setDraft}
            multiline
          />
          <TouchableOpacity
            style={[styles.sendButton, !draft.trim() && styles.sendButtonDisabled]}
            onPress={sendMessage}
            disabled={!draft.trim()}
          >
            <Ionicons name="send" size={16} color={colors.onAccent} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  flex: { flex: 1 },
  header: {
    height: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: spacing.lg, borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  headerCenter: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  headerAvatar: { width: 36, height: 36, borderRadius: radius.full, backgroundColor: colors.surfaceHigh },
  headerName: { ...type.labelLg, color: colors.textPrimary },
  headerStatus: { ...type.bodySm, color: colors.success },
  messageList: { padding: spacing.lg, gap: spacing.md },
  bubbleRow: { alignItems: 'flex-start', maxWidth: '80%' },
  bubbleRowMe: { alignSelf: 'flex-end', alignItems: 'flex-end' },
  bubble: { borderRadius: radius.lg, paddingHorizontal: spacing.md, paddingVertical: spacing.sm },
  bubbleThem: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderBottomLeftRadius: 4 },
  bubbleMe: { backgroundColor: colors.accent, borderBottomRightRadius: 4 },
  bubbleText: { ...type.bodyMd, color: colors.textPrimary },
  bubbleTextMe: { color: colors.onAccent },
  bubbleTime: { ...type.labelSm, color: colors.textMuted, marginTop: 2 },
  bubbleTimeMe: { color: colors.textMuted },
  inputBar: {
    flexDirection: 'row', alignItems: 'flex-end', gap: spacing.sm, padding: spacing.md,
    borderTopWidth: 1, borderTopColor: colors.border,
  },
  attachButton: {
    width: 36, height: 36, borderRadius: radius.full, backgroundColor: colors.surface,
    alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.border,
  },
  textInput: {
    flex: 1, ...type.bodyMd, color: colors.textPrimary, backgroundColor: colors.surface,
    borderRadius: radius.lg, paddingHorizontal: spacing.md, paddingVertical: spacing.sm,
    borderWidth: 1, borderColor: colors.border, maxHeight: 100,
  },
  sendButton: {
    width: 36, height: 36, borderRadius: radius.full, backgroundColor: colors.accent,
    alignItems: 'center', justifyContent: 'center',
  },
  sendButtonDisabled: { backgroundColor: colors.surfaceHigh },
})
