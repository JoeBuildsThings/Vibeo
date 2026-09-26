import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native'
import { colors, type, spacing } from '../theme/tokens'

export default function LoadingScreen({ label = 'Loading Vibeo...' }) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Image
          source={require('../../assets/vibeo-mark.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.label}>{label}</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  logo: { width: 96, height: 96, marginBottom: spacing.lg },
  label: { ...type.bodyMd, color: colors.textSecondary },
})
