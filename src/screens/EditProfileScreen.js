import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { colors, type, radius, spacing } from '../theme/tokens'

export default function EditProfileScreen({ navigation }) {
  const [name, setName] = useState('Marcus Vance')
  const [username, setUsername] = useState('marcusv')
  const [bio, setBio] = useState('Senior Product Designer and Systems Architect. Building minimal, dark mode first interfaces.')
  const [location, setLocation] = useState('San Francisco, CA')
  const [link, setLink] = useState('marcusv.design')

  const handleSave = () => {
    Alert.alert('Profile updated', 'Your changes have been saved.', [
      { text: 'OK', onPress: () => navigation?.goBack() },
    ])
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation?.goBack()}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>Edit Profile</Text>
        <TouchableOpacity onPress={handleSave}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.avatarSection}>
          <View style={styles.avatarLarge} />
          <TouchableOpacity>
            <Text style={styles.changePhotoText}>Change Photo</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Name</Text>
            <TextInput style={styles.input} value={name} onChangeText={setName} placeholderTextColor={colors.textMuted} />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Username</Text>
            <View style={styles.inputWrap}>
              <Text style={styles.atSign}>@</Text>
              <TextInput
                style={styles.inputInline}
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                placeholderTextColor={colors.textMuted}
              />
            </View>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Bio</Text>
            <TextInput
              style={[styles.input, styles.bioInput]}
              value={bio}
              onChangeText={setBio}
              multiline
              placeholderTextColor={colors.textMuted}
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Location</Text>
            <TextInput style={styles.input} value={location} onChangeText={setLocation} placeholderTextColor={colors.textMuted} />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Website</Text>
            <TextInput style={styles.input} value={link} onChangeText={setLink} autoCapitalize="none" placeholderTextColor={colors.textMuted} />
          </View>
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
  topBarTitle: { ...type.headlineSm, color: colors.textPrimary },
  cancelText: { ...type.labelLg, color: colors.textSecondary },
  saveText: { ...type.labelLg, color: colors.accent },
  scroll: { padding: spacing.lg, gap: spacing.xl },
  avatarSection: { alignItems: 'center', gap: spacing.sm },
  avatarLarge: { width: 88, height: 88, borderRadius: radius.full, backgroundColor: colors.surfaceHigh },
  changePhotoText: { ...type.labelMd, color: colors.accent },
  form: { gap: spacing.lg },
  fieldGroup: { gap: spacing.xs },
  label: { ...type.labelMd, color: colors.textSecondary },
  input: {
    backgroundColor: colors.surface, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border,
    paddingHorizontal: spacing.md, paddingVertical: spacing.sm, ...type.bodyMd, color: colors.textPrimary,
  },
  bioInput: { height: 90, textAlignVertical: 'top' },
  inputWrap: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface,
    borderRadius: radius.md, borderWidth: 1, borderColor: colors.border, paddingHorizontal: spacing.md,
  },
  atSign: { ...type.bodyMd, color: colors.textMuted },
  inputInline: { flex: 1, ...type.bodyMd, color: colors.textPrimary, paddingVertical: spacing.sm, paddingLeft: 2 },
})
