import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  useColorScheme,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  ArrowLeft,
  Bell,
  Shield,
  Palette,
  Globe,
  HelpCircle,
  Info,
  FileText,
  Mail,
  LogOut,
  ChevronRight,
  Moon,
  Sun,
  Vibrate,
  Volume2,
  Lock,
} from "lucide-react-native";
import { useRouter } from "expo-router";
import { useSafeBack } from '@/utils/navigation';
import { useEffect } from 'react';
import { useSettingsStore } from '@/utils/settings/store';
import { getIsDark } from '@/utils/theme';

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const safeBack = useSafeBack();
  const colorScheme = useColorScheme();
  const { init, isReady, appearance, language } = useSettingsStore();
  useEffect(() => { init(); }, [init]);
  const isDark = getIsDark(colorScheme === 'dark', appearance?.theme);

  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);

  // Do not block render on fonts; rely on global loading/fallback

  const colors = {
    primary: isDark ? "#FFFFFF" : "#000000",
    secondary: isDark ? "#CCCCCC" : "#6B7280",
    accent: "#16A34A",
    accentLight: "#DCFCE7",
    white: isDark ? "#121212" : "#FFFFFF",
    background: isDark ? "#1F1F1F" : "#F9FAFB",
    card: isDark ? "#2A2A2A" : "#FFFFFF",
    border: isDark ? "#374151" : "#E5E7EB",
    danger: "#EF4444",
    warning: "#F59E0B",
  };

  const SettingsSection = ({ title, children }) => (
    <View style={{ marginBottom: 24 }}>
      <Text
        style={{
          fontFamily: "Inter_600SemiBold",
          fontSize: 14,
          color: colors.secondary,
          marginBottom: 12,
          paddingHorizontal: 24,
          textTransform: "uppercase",
          letterSpacing: 0.5,
        }}
      >
        {title}
      </Text>
      <View
        style={{
          backgroundColor: colors.card,
          paddingHorizontal: 24,
        }}
      >
        {children}
      </View>
    </View>
  );

  const SettingsItem = ({
    icon: IconComponent,
    title,
    description,
    onPress,
    showArrow = true,
    iconColor,
    iconBackground,
    rightElement,
  }) => (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
      }}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
      disabled={!onPress}
    >
      <View
        style={{
          width: 40,
          height: 40,
          backgroundColor: iconBackground || colors.background,
          borderRadius: 20,
          alignItems: "center",
          justifyContent: "center",
          marginRight: 16,
        }}
      >
        <IconComponent size={20} color={iconColor || colors.primary} />
      </View>
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontFamily: "Inter_500Medium",
            fontSize: 16,
            color: colors.primary,
            marginBottom: description ? 4 : 0,
          }}
        >
          {title}
        </Text>
        {description && (
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 13,
              color: colors.secondary,
              lineHeight: 18,
            }}
          >
            {description}
          </Text>
        )}
      </View>
      {rightElement || (showArrow && (
        <ChevronRight size={20} color={colors.secondary} />
      ))}
    </TouchableOpacity>
  );

  const ToggleItem = ({
    icon: IconComponent,
    title,
    description,
    value,
    onValueChange,
    iconColor,
    iconBackground,
  }) => (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
      }}
    >
      <View
        style={{
          width: 40,
          height: 40,
          backgroundColor: iconBackground || colors.background,
          borderRadius: 20,
          alignItems: "center",
          justifyContent: "center",
          marginRight: 16,
        }}
      >
        <IconComponent size={20} color={iconColor || colors.primary} />
      </View>
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontFamily: "Inter_500Medium",
            fontSize: 16,
            color: colors.primary,
            marginBottom: description ? 4 : 0,
          }}
        >
          {title}
        </Text>
        {description && (
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 13,
              color: colors.secondary,
              lineHeight: 18,
            }}
          >
            {description}
          </Text>
        )}
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: colors.border, true: colors.accentLight }}
        thumbColor={value ? colors.accent : colors.background}
      />
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style={isDark ? "light" : "dark"} />

      {/* Header */}
      <View
        style={{
          backgroundColor: colors.white,
          paddingTop: insets.top + 16,
          paddingBottom: 16,
          paddingHorizontal: 24,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 4,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            onPress={safeBack}
            style={{
              width: 40,
              height: 40,
              backgroundColor: colors.background,
              borderRadius: 20,
              alignItems: "center",
              justifyContent: "center",
            }}
            activeOpacity={0.7}
          >
            <ArrowLeft size={20} color={colors.primary} />
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 18,
              color: colors.primary,
            }}
          >
            Ayarlar
          </Text>
          <View style={{ width: 40 }} />
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 24 }}
      >
        {/* Notifications */}
        <SettingsSection title="Bildirimler">
          <ToggleItem
            icon={Bell}
            title="Push Bildirimleri"
            description="Uygulama bildirimlerini al"
            value={pushNotifications}
            onValueChange={setPushNotifications}
            iconColor={colors.accent}
            iconBackground={colors.accentLight}
          />
          <ToggleItem
            icon={Mail}
            title="E-posta Bildirimleri"
            description="E-posta ile bilgilendirilme"
            value={emailNotifications}
            onValueChange={setEmailNotifications}
            iconColor={colors.accent}
            iconBackground={colors.accentLight}
          />
          <ToggleItem
            icon={Volume2}
            title="Ses"
            description="Bildirim sesleri"
            value={soundEnabled}
            onValueChange={setSoundEnabled}
            iconColor={colors.accent}
            iconBackground={colors.accentLight}
          />
          <ToggleItem
            icon={Vibrate}
            title="Titreşim"
            description="Bildirim titreşimi"
            value={vibrationEnabled}
            onValueChange={setVibrationEnabled}
            iconColor={colors.accent}
            iconBackground={colors.accentLight}
          />
        </SettingsSection>

        {/* Appearance */}
        <SettingsSection title="Görünüm">
          <SettingsItem
            icon={isDark ? Moon : Sun}
            title="Tema"
            description={`Şu an: ${appearance?.theme === 'dark' ? 'Koyu' : appearance?.theme === 'light' ? 'Açık' : 'Sistem'} tema`}
            onPress={() => router.push('/theme-settings')}
            iconColor={colors.warning}
            iconBackground={`${colors.warning}20`}
          />
          <SettingsItem
            icon={Globe}
            title="Dil"
            description={language === 'en' ? 'English' : 'Türkçe'}
            onPress={() => router.push('/language-settings')}
            iconColor={colors.accent}
            iconBackground={colors.accentLight}
          />
        </SettingsSection>

        {/* Privacy & Security */}
        <SettingsSection title="Gizlilik ve Güvenlik">
          <SettingsItem
            icon={Lock}
            title="Gizlilik Ayarları"
            description="Veri paylaşımı ve gizlilik"
            onPress={() => router.push("/privacy-settings")}
            iconColor="#8B5CF6"
            iconBackground="#F3E8FF"
          />
          <SettingsItem
            icon={Shield}
            title="Güvenlik"
            description="Hesap güvenliği ve doğrulama"
            onPress={() => router.push("/security-settings")}
            iconColor="#3B82F6"
            iconBackground="#DBEAFE"
          />
        </SettingsSection>

        {/* About & Support */}
        <SettingsSection title="Hakkında ve Destek">
          <SettingsItem
            icon={HelpCircle}
            title="Yardım ve SSS"
            onPress={() => router.push("/help")}
            iconColor={colors.accent}
            iconBackground={colors.accentLight}
          />
          <SettingsItem
            icon={Info}
            title="Hakkında"
            onPress={() => router.push("/about")}
            iconColor={colors.accent}
            iconBackground={colors.accentLight}
          />
          <SettingsItem
            icon={FileText}
            title="Kullanım Koşulları"
            onPress={() => router.push("/terms")}
            iconColor={colors.accent}
            iconBackground={colors.accentLight}
          />
          <SettingsItem
            icon={FileText}
            title="Gizlilik Politikası"
            onPress={() => router.push("/privacy-policy")}
            iconColor={colors.accent}
            iconBackground={colors.accentLight}
          />
          <SettingsItem
            icon={Mail}
            title="İletişim"
            onPress={() => router.push("/contact")}
            iconColor={colors.accent}
            iconBackground={colors.accentLight}
          />
        </SettingsSection>

        {/* Account */}
        <View style={{ paddingHorizontal: 24, marginBottom: 24 }}>
          <TouchableOpacity
            style={{
              backgroundColor: colors.card,
              borderRadius: 12,
              padding: 16,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1,
              borderColor: colors.danger,
            }}
            activeOpacity={0.8}
            onPress={() => router.push('/logout')}
          >
            <LogOut size={20} color={colors.danger} style={{ marginRight: 8 }} />
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 16,
                color: colors.danger,
              }}
            >
              Çıkış Yap
            </Text>
          </TouchableOpacity>
        </View>

        {/* App Version */}
        <View style={{ paddingHorizontal: 24, marginBottom: 24 }}>
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 13,
              color: colors.secondary,
              textAlign: "center",
            }}
          >
            Çay Güvenlik v1.0.0
          </Text>
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 12,
              color: colors.secondary,
              textAlign: "center",
              marginTop: 4,
            }}
          >
            © 2024 Tüm hakları saklıdır
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
