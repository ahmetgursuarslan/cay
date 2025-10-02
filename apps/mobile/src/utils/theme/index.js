export const getIsDark = (systemDark, preference) => {
  if (!preference || preference === 'system') return systemDark;
  return preference === 'dark';
};

export const makeColors = (isDark) => ({
  primary: isDark ? '#FFFFFF' : '#000000',
  secondary: isDark ? '#CCCCCC' : '#6B7280',
  accent: '#16A34A',
  accentLight: '#DCFCE7',
  white: isDark ? '#121212' : '#FFFFFF',
  background: isDark ? '#1F1F1F' : '#F9FAFB',
  surface: isDark ? '#2A2A2A' : '#FFFFFF',
  card: isDark ? '#2A2A2A' : '#FFFFFF',
  border: isDark ? '#374151' : '#E5E7EB',
  danger: '#EF4444',
  warning: '#F59E0B',
  blue: '#3B82F6',
  purple: '#8B5CF6',
});
