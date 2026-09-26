// Vibeo design tokens
// Rebuilt from the Stitch export, corrected for two standing rules:
// 1. Inter everywhere is banned, swapped for a distinct pairing
// 2. Low contrast dark mode is banned, secondary text and borders pushed up

export const colors = {
  background: '#0B0C0F',
  surfaceLow: '#141519',
  surface: '#1A1B20',
  surfaceHigh: '#24262D',
  surfaceHighest: '#2E3038',

  textPrimary: '#F5F6F8',
  textSecondary: '#B8BCC6',
  textMuted: '#8A8F9C',

  accent: '#5B8DEF',
  accentStrong: '#3D6FE0',
  onAccent: '#FFFFFF',

  amber: '#F2A65A',

  border: '#33353D',
  borderStrong: '#454852',

  error: '#F2695C',
  success: '#5BC98D',

  online: '#5BC98D',
}

export const fonts = {
  heading: 'Sora_700Bold',
  headingSemibold: 'Sora_600SemiBold',
  body: 'Manrope_400Regular',
  bodyMedium: 'Manrope_500Medium',
  bodySemibold: 'Manrope_600SemiBold',
}

export const type = {
  headlineLg: { fontFamily: fonts.heading, fontSize: 28, lineHeight: 34 },
  headlineMd: { fontFamily: fonts.headingSemibold, fontSize: 20, lineHeight: 26 },
  headlineSm: { fontFamily: fonts.headingSemibold, fontSize: 17, lineHeight: 22 },
  bodyLg: { fontFamily: fonts.body, fontSize: 16, lineHeight: 23 },
  bodyMd: { fontFamily: fonts.body, fontSize: 14, lineHeight: 20 },
  bodySm: { fontFamily: fonts.body, fontSize: 12, lineHeight: 17 },
  labelLg: { fontFamily: fonts.bodySemibold, fontSize: 14, lineHeight: 18 },
  labelMd: { fontFamily: fonts.bodyMedium, fontSize: 12, lineHeight: 16 },
  labelSm: { fontFamily: fonts.bodySemibold, fontSize: 10, lineHeight: 13 },
}

export const radius = {
  sm: 6,
  md: 10,
  lg: 14,
  xl: 20,
  full: 999,
}

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
}
