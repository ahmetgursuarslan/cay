import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  useColorScheme,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Bell,
  Shield,
  Search,
  Image as ImageIcon,
  UserCheck,
  AlertTriangle,
  Heart,
  Coffee,
} from "lucide-react-native";
import { useRouter } from "expo-router";
// Fonts are loaded at the root layout; avoid per-screen gating

const { width: screenWidth } = Dimensions.get("window");

export default function Home() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [showHeaderBorder, setShowHeaderBorder] = useState(false);

  // Do not block render on fonts here; root layout handles fonts

  // Color palette with green theme
  const colors = {
    primary: isDark ? "#FFFFFF" : "#000000",
    secondary: isDark ? "#CCCCCC" : "#6B7280",
    accent: "#16A34A", // Green accent
    accentLight: "#DCFCE7",
    accentDark: "#15803D",
    white: isDark ? "#121212" : "#FFFFFF",
    background: isDark ? "#1F1F1F" : "#F9FAFB",
    card: isDark ? "#2A2A2A" : "#FFFFFF",
    danger: "#EF4444",
    dangerLight: "#FEE2E2",
    warning: "#F59E0B",
    warningLight: "#FEF3C7",
  };

  const handleScroll = (event) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    setShowHeaderBorder(scrollY > 0);
  };

  const SafetyFeatureCard = ({
    icon: IconComponent,
    title,
    description,
    color,
    backgroundColor,
    onPress,
  }) => (
    <TouchableOpacity
      style={{
        backgroundColor: backgroundColor,
        borderRadius: 20,
        padding: 24,
        marginBottom: 16,
        shadowColor: isDark ? "#000" : "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: isDark ? 0.5 : 0.1,
        shadowRadius: 12,
        elevation: 4,
      }}
      onPress={onPress}
      activeOpacity={0.95}
    >
      <View
        style={{
          width: 56,
          height: 56,
          backgroundColor: color,
          borderRadius: 28,
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 16,
        }}
      >
        <IconComponent size={28} color="white" />
      </View>
      <Text
        style={{
          fontFamily: "Inter_600SemiBold",
          fontSize: 18,
          color: colors.primary,
          marginBottom: 8,
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          fontFamily: "Inter_400Regular",
          fontSize: 14,
          color: colors.secondary,
          lineHeight: 20,
        }}
      >
        {description}
      </Text>
    </TouchableOpacity>
  );

  const QuickActionButton = ({
    icon: IconComponent,
    title,
    onPress,
    variant = "primary",
  }) => (
    <TouchableOpacity
      style={{
        flex: 1,
        backgroundColor: variant === "primary" ? colors.accent : colors.card,
        borderRadius: 16,
        padding: 20,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 6,
        shadowColor: isDark ? "#000" : "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: isDark ? 0.5 : 0.1,
        shadowRadius: 8,
        elevation: 2,
      }}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <IconComponent
        size={24}
        color={variant === "primary" ? "white" : colors.primary}
      />
      <Text
        style={{
          fontFamily: "Inter_500Medium",
          fontSize: 12,
          color: variant === "primary" ? "white" : colors.primary,
          marginTop: 8,
          textAlign: "center",
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
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
          borderBottomColor: isDark ? "#374151" : "#E5E7EB",
          shadowColor: showHeaderBorder ? "#000" : "transparent",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: showHeaderBorder ? 4 : 0,
          zIndex: 1000,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 4 }}>
              <Coffee size={24} color={colors.accent} />
              <Text
                style={{
                  fontFamily: "Inter_700Bold",
                  fontSize: 24,
                  color: colors.accent,
                  marginLeft: 8,
                }}
              >
                Çay
              </Text>
            </View>
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 14,
                color: colors.secondary,
              }}
            >
              Güvenli flört için araçların
            </Text>
          </View>
          <TouchableOpacity
            style={{
              width: 44,
              height: 44,
              backgroundColor: colors.accentLight,
              borderRadius: 22,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Bell size={20} color={colors.accent} />
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
        {/* Hero Section */}
        <View style={{ paddingHorizontal: 24, paddingVertical: 32 }}>
          <Text
            style={{
              fontFamily: "Inter_700Bold",
              fontSize: 32,
              color: colors.primary,
              textAlign: "center",
              marginBottom: 16,
              lineHeight: 40,
            }}
          >
            Güvenle{"\n"}Flört Et
          </Text>
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 16,
              color: colors.secondary,
              textAlign: "center",
              lineHeight: 24,
              marginBottom: 32,
            }}
          >
            Çay ile tanıştığın kişileri araştır, geçmişlerini öğren ve güvenli flört deneyimi yaşa
          </Text>

          {/* Quick Actions */}
          <View
            style={{
              flexDirection: "row",
              marginBottom: 40,
              marginHorizontal: -6,
            }}
          >
            <QuickActionButton
              icon={Search}
              title="Hızlı Araştırma"
              onPress={() => router.push("/(tabs)/search")}
              variant="primary"
            />
            <QuickActionButton
              icon={ImageIcon}
              title="Fotoğraf Kontrolü"
              onPress={() => router.push("/photo-check")}
            />
            <QuickActionButton
              icon={UserCheck}
              title="Profil Doğrulama"
              onPress={() => router.push("/verify-profile")}
            />
          </View>
        </View>

        {/* Safety Features */}
        <View style={{ paddingHorizontal: 24 }}>
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 20,
              color: colors.primary,
              marginBottom: 24,
            }}
          >
            Güvenlik Araçlarımız
          </Text>

          <SafetyFeatureCard
            icon={Search}
            title="Geçmiş Kontrolü"
            description="Tanıştığın kişinin adını, telefon numarasını veya sosyal medya profilini araştır ve güvenli olup olmadığını öğren."
            color={colors.accent}
            backgroundColor={colors.card}
            onPress={() => router.push("/(tabs)/search")}
          />

          <SafetyFeatureCard
            icon={ImageIcon}
            title="Ters Görsel Arama"
            description="Profil fotoğraflarının gerçek olup olmadığını kontrol et ve sahte profilleri tespit et."
            color={colors.warning}
            backgroundColor={colors.card}
            onPress={() => router.push("/photo-check")}
          />

          <SafetyFeatureCard
            icon={UserCheck}
            title="Kimlik Doğrulama"
            description="Kişinin gerçek kimliğini doğrula ve sahte profillere karşı kendini koru."
            color="#3B82F6"
            backgroundColor={colors.card}
            onPress={() => router.push("/verify-profile")}
          />

          <SafetyFeatureCard
            icon={AlertTriangle}
            title="Suç Kaydı Kontrolü"
            description="Tanıştığın kişinin suç geçmişi olup olmadığını öğren ve güvenliğini sağla."
            color={colors.danger}
            backgroundColor={colors.card}
            onPress={() => router.push("/criminal-check")}
          />

          <SafetyFeatureCard
            icon={Shield}
            title="Güvenlik İpuçları"
            description="Online flörtte dikkat etmen gereken noktalar ve güvenli buluşma önerileri."
            color="#8B5CF6"
            backgroundColor={colors.card}
            onPress={() => router.push("/(tabs)/safety")}
          />
        </View>

        {/* Call to Action */}
        <View style={{ paddingHorizontal: 24, paddingVertical: 32 }}>
          <View
            style={{
              backgroundColor: colors.accent,
              borderRadius: 20,
              padding: 32,
              alignItems: "center",
            }}
          >
            <Heart size={32} color="white" style={{ marginBottom: 16 }} />
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 18,
                color: "white",
                textAlign: "center",
                marginBottom: 8,
              }}
            >
              Güvenli Aşk Başlasın
            </Text>
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 14,
                color: "rgba(255,255,255,0.8)",
                textAlign: "center",
                lineHeight: 20,
                marginBottom: 24,
              }}
            >
              Milyonlarca kadın Çay ile güvenle flört ediyor. Sen de katıl!
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: "white",
                paddingHorizontal: 32,
                paddingVertical: 12,
                borderRadius: 24,
              }}
              activeOpacity={0.9}
            >
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 16,
                  color: colors.accent,
                }}
              >
                Hemen Başla
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}