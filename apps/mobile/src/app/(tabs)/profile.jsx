import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  User,
  Settings,
  Bell,
  Shield,
  HelpCircle,
  Info,
  LogOut,
  ChevronRight,
  Star,
  Award,
  Mail,
  Lock,
  Palette,
  Globe,
} from "lucide-react-native";
import { useRouter } from "expo-router";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import { useSettingsStore } from "@/utils/settings/store";
import { getIsDark, makeColors } from "@/utils/theme";

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const [showHeaderBorder, setShowHeaderBorder] = useState(false);
  const { init, isReady: settingsReady, profile, appearance } = useSettingsStore();
  useEffect(() => { init(); }, [init]);
  const isDark = getIsDark(colorScheme === 'dark', appearance?.theme);

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  // Render using system fonts if web fonts haven't loaded yet

  const colors = makeColors(isDark);

  const handleScroll = (event) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    setShowHeaderBorder(scrollY > 0);
  };

  const fullName = (profile?.firstName || profile?.lastName) ? `${profile?.firstName || ''} ${profile?.lastName || ''}`.trim() : null;
  const ProfileHeader = () => (
    <View style={{ paddingHorizontal: 24, paddingTop: 24, marginBottom: 32 }}>
      <View
        style={{
          backgroundColor: colors.accent,
          borderRadius: 20,
          padding: 24,
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: 80,
            height: 80,
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            borderRadius: 40,
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 16,
          }}
        >
          <User size={40} color="white" />
        </View>
        <Text
          style={{
            fontFamily: "Inter_700Bold",
            fontSize: 24,
            color: "white",
            textAlign: "center",
            marginBottom: 8,
          }}
        >
          {fullName || 'Hoş Geldin!'}
        </Text>
        <Text
          style={{
            fontFamily: "Inter_400Regular",
            fontSize: 14,
            color: "rgba(255,255,255,0.8)",
            textAlign: "center",
            marginBottom: 20,
          }}
        >
          Güvenli flört deneyiminizi kişiselleştirin
        </Text>
        
        {/* User Stats */}
        <View style={{ flexDirection: "row", justifyContent: "space-around", width: "100%" }}>
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                fontFamily: "Inter_700Bold",
                fontSize: 20,
                color: "white",
              }}
            >
              12
            </Text>
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 12,
                color: "rgba(255,255,255,0.8)",
              }}
            >
              Araştırma
            </Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                fontFamily: "Inter_700Bold",
                fontSize: 20,
                color: "white",
              }}
            >
              3
            </Text>
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 12,
                color: "rgba(255,255,255,0.8)",
              }}
            >
              Yorum
            </Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                fontFamily: "Inter_700Bold",
                fontSize: 20,
                color: "white",
              }}
            >
              8
            </Text>
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 12,
                color: "rgba(255,255,255,0.8)",
              }}
            >
              Güvenli Buluşma
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

  const SettingsOption = ({
    icon: IconComponent,
    title,
    description,
    onPress,
    showArrow = true,
    iconColor = colors.primary,
    iconBackground = colors.background,
  }) => (
    <TouchableOpacity
      style={{
        backgroundColor: colors.card,
        borderRadius: 16,
        padding: 20,
        marginBottom: 12,
        flexDirection: "row",
        alignItems: "center",
        shadowColor: isDark ? "#000" : "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: isDark ? 0.5 : 0.1,
        shadowRadius: 8,
        elevation: 2,
      }}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View
        style={{
          width: 48,
          height: 48,
          backgroundColor: iconBackground,
          borderRadius: 24,
          alignItems: "center",
          justifyContent: "center",
          marginRight: 16,
        }}
      >
        <IconComponent size={24} color={iconColor} />
      </View>
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontFamily: "Inter_600SemiBold",
            fontSize: 16,
            color: colors.primary,
            marginBottom: 4,
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            fontFamily: "Inter_400Regular",
            fontSize: 14,
            color: colors.secondary,
          }}
        >
          {description}
        </Text>
      </View>
      {showArrow && <ChevronRight size={20} color={colors.secondary} />}
    </TouchableOpacity>
  );

  const AchievementCard = ({ icon: IconComponent, title, description, color }) => (
    <View
      style={{
        backgroundColor: colors.card,
        borderRadius: 16,
        padding: 20,
        alignItems: "center",
        flex: 1,
        marginHorizontal: 6,
        shadowColor: isDark ? "#000" : "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: isDark ? 0.5 : 0.1,
        shadowRadius: 8,
        elevation: 2,
      }}
    >
      <View
        style={{
          width: 48,
          height: 48,
          backgroundColor: `${color}20`,
          borderRadius: 24,
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 12,
        }}
      >
        <IconComponent size={24} color={color} />
      </View>
      <Text
        style={{
          fontFamily: "Inter_600SemiBold",
          fontSize: 14,
          color: colors.primary,
          textAlign: "center",
          marginBottom: 4,
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          fontFamily: "Inter_400Regular",
          fontSize: 12,
          color: colors.secondary,
          textAlign: "center",
        }}
      >
        {description}
      </Text>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style={isDark ? "light" : "dark"} />

      {/* Fixed Header */}
      <View
        style={{
          backgroundColor: colors.white,
          paddingTop: insets.top + 16,
          paddingBottom: 20,
          paddingHorizontal: 24,
          borderBottomWidth: showHeaderBorder ? 1 : 0,
          borderBottomColor: colors.border,
          shadowColor: showHeaderBorder ? "#000" : "transparent",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: showHeaderBorder ? 4 : 0,
          zIndex: 1000,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <View>
            <Text
              style={{
                fontFamily: "Inter_700Bold",
                fontSize: 24,
                color: colors.primary,
                marginBottom: 4,
              }}
            >
              Profilim
            </Text>
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 14,
                color: colors.secondary,
              }}
            >
              Hesap ayarları ve tercihler
            </Text>
          </View>
          
          <TouchableOpacity
            style={{
              backgroundColor: colors.accentLight,
              width: 48,
              height: 48,
              borderRadius: 24,
              alignItems: "center",
              justifyContent: "center",
            }}
            activeOpacity={0.8}
            onPress={() => router.push('/settings')}
          >
            <Settings size={24} color={colors.accent} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {/* Profile Header */}
        <ProfileHeader />

        {/* Achievements */}
        <View style={{ paddingHorizontal: 24, marginBottom: 32 }}>
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 18,
              color: colors.primary,
              marginBottom: 16,
            }}
          >
            Başarılarım
          </Text>
          <View style={{ flexDirection: "row", marginHorizontal: -6 }}>
            <AchievementCard
              icon={Shield}
              title="Güvenlik Uzmanı"
              description="10+ Güvenli Buluşma"
              color={colors.accent}
            />
            <AchievementCard
              icon={Star}
              title="Topluluk Dostu"
              description="5+ Yardımcı Yorum"
              color={colors.warning}
            />
            <AchievementCard
              icon={Award}
              title="Aktif Kullanıcı"
              description="30+ Gün Aktif"
              color={colors.purple}
            />
          </View>
        </View>

        {/* Settings Sections */}
        <View style={{ paddingHorizontal: 24 }}>
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 18,
              color: colors.primary,
              marginBottom: 16,
            }}
          >
            Hesap Ayarları 
          </Text>

          <SettingsOption
            icon={Lock}
            title="Gizlilik ve Güvenlik"
            description="Hesap güvenlik ayarları"
            onPress={() => router.push("/privacy-settings")}
            iconColor={colors.danger}
            iconBackground={`${colors.danger}20`}
          />

          <SettingsOption
            icon={Bell}
            title="Bildirimler"
            description="Uyarı ve bildirim ayarları"
            onPress={() => router.push("/notification-settings")}
            iconColor={colors.warning}
            iconBackground={`${colors.warning}20`}
          />
        </View>

        {/* App Settings */}
        <View style={{ paddingHorizontal: 24, paddingTop: 32 }}>
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 18,
              color: colors.primary,
              marginBottom: 16,
            }}
          >
            Uygulama Ayarları
          </Text>

          <SettingsOption
            icon={Palette}
            title="Tema"
            description="Açık/koyu mod ayarları"
            onPress={() => router.push("/theme-settings")}
            iconColor={colors.purple}
            iconBackground={`${colors.purple}20`}
          />

          <SettingsOption
            icon={Globe}
            title="Dil"
            description="Uygulama dili (Türkçe)"
            onPress={() => router.push("/language-settings")}
            iconColor={colors.blue}
            iconBackground={`${colors.blue}20`}
          /><SettingsOption
            icon={Info}
            title="Uygulama Hakkında"
            description="Versiyon bilgisi ve şartlar"
            onPress={() => router.push("/about")}
            iconColor={colors.secondary}
            iconBackground={colors.background}
          />
        </View>

        {/* Account Actions */}
        <View style={{ paddingHorizontal: 24, paddingTop: 32 }}>
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 18,
              color: colors.primary,
              marginBottom: 16,
            }}
          >
            Hesap İşlemleri
          </Text>

          <SettingsOption
            icon={LogOut}
            title="Çıkış Yap"
            description="Hesabınızdan güvenli şekilde çıkış yapın"
            onPress={() => router.push("/(auth)/logout")}
            iconColor={colors.danger}
            iconBackground={`${colors.danger}20`}
          />
        </View>

        {/* App Info */}
        <View style={{ paddingHorizontal: 24, paddingVertical: 32 }}>
          <View
            style={{
              backgroundColor: colors.card,
              borderRadius: 16,
              padding: 24,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 16,
                color: colors.primary,
                textAlign: "center",
                marginBottom: 8,
              }}
            >
              Çay - Güvenli Flört
            </Text>
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 14,
                color: colors.secondary,
                textAlign: "center",
                marginBottom: 4,
              }}
            >
              Versiyon 1.0.0
            </Text>
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 12,
                color: colors.secondary,
                textAlign: "center",
              }}
            >
              © 2024 Çay Team. Tüm hakları saklıdır.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
