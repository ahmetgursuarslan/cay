import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
  Linking,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  ArrowLeft,
  Shield,
  Heart,
  Users,
  Award,
  Mail,
  Globe,
  Github,
  Twitter,
  Instagram,
  ExternalLink,
} from "lucide-react-native";
import { useRouter } from "expo-router";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";

export default function AboutScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  // Render using system fonts if web fonts haven't loaded yet

  const colors = {
    primary: isDark ? "#FFFFFF" : "#000000",
    secondary: isDark ? "#CCCCCC" : "#6B7280",
    accent: "#16A34A",
    accentLight: "#DCFCE7",
    white: isDark ? "#121212" : "#FFFFFF",
    background: isDark ? "#1F1F1F" : "#F9FAFB",
    card: isDark ? "#2A2A2A" : "#FFFFFF",
    border: isDark ? "#374151" : "#E5E7EB",
  };

  const stats = [
    { label: "Kullanıcı", value: "50K+", icon: Users },
    { label: "Yorum", value: "100K+", icon: Heart },
    { label: "Güvenli Buluşma", value: "25K+", icon: Shield },
    { label: "Başarı Oranı", value: "%95", icon: Award },
  ];

  const features = [
    {
      icon: Shield,
      title: "Güvenlik Önceliğimiz",
      description:
        "Kullanıcılarımızın güvenliği bizim için her şeyden önemlidir. Tüm yorumlar moderatör ekibimiz tarafından incelenir.",
    },
    {
      icon: Users,
      title: "Topluluk Odaklı",
      description:
        "Kullanıcılarımızın birbirine yardımcı olduğu, güvenli bir topluluk oluşturduk.",
    },
    {
      icon: Heart,
      title: "Ücretsiz Hizmet",
      description:
        "Temel özelliklerimiz tamamen ücretsizdir. Herkesin güvenli flört deneyimi yaşaması için çalışıyoruz.",
    },
  ];

  const team = [
    { name: "Ahmet Gür", role: "Kurucu & CEO" },
    { name: "Zeynep Arslan", role: "CTO" },
    { name: "Mehmet Kaya", role: "Baş Tasarımcı" },
  ];

  const socialLinks = [
    { icon: Globe, label: "Website", url: "https://cayguvenlik.com" },
    { icon: Twitter, label: "Twitter", url: "https://twitter.com/cayguvenlik" },
    { icon: Instagram, label: "Instagram", url: "https://instagram.com/cayguvenlik" },
    { icon: Github, label: "GitHub", url: "https://github.com/cayguvenlik" },
  ];

  const StatCard = ({ stat }) => {
    const Icon = stat.icon;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.card,
          borderRadius: 16,
          padding: 20,
          marginHorizontal: 6,
          alignItems: "center",
          borderWidth: 1,
          borderColor: colors.border,
        }}
      >
        <Icon size={28} color={colors.accent} />
        <Text
          style={{
            fontFamily: "Inter_700Bold",
            fontSize: 24,
            color: colors.primary,
            marginTop: 12,
          }}
        >
          {stat.value}
        </Text>
        <Text
          style={{
            fontFamily: "Inter_400Regular",
            fontSize: 12,
            color: colors.secondary,
            marginTop: 4,
            textAlign: "center",
          }}
        >
          {stat.label}
        </Text>
      </View>
    );
  };

  const FeatureCard = ({ feature }) => {
    const Icon = feature.icon;
    return (
      <View
        style={{
          backgroundColor: colors.card,
          borderRadius: 16,
          padding: 20,
          marginBottom: 16,
          borderWidth: 1,
          borderColor: colors.border,
        }}
      >
        <View
          style={{
            width: 56,
            height: 56,
            backgroundColor: colors.accentLight,
            borderRadius: 28,
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 16,
          }}
        >
          <Icon size={28} color={colors.accent} />
        </View>
        <Text
          style={{
            fontFamily: "Inter_600SemiBold",
            fontSize: 18,
            color: colors.primary,
            marginBottom: 8,
          }}
        >
          {feature.title}
        </Text>
        <Text
          style={{
            fontFamily: "Inter_400Regular",
            fontSize: 14,
            color: colors.secondary,
            lineHeight: 20,
          }}
        >
          {feature.description}
        </Text>
      </View>
    );
  };

  const SocialLink = ({ link }) => {
    const Icon = link.icon;
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          backgroundColor: colors.card,
          borderRadius: 12,
          padding: 16,
          marginHorizontal: 6,
          alignItems: "center",
          borderWidth: 1,
          borderColor: colors.border,
        }}
        onPress={() => Linking.openURL(link.url)}
        activeOpacity={0.8}
      >
        <Icon size={24} color={colors.accent} />
        <Text
          style={{
            fontFamily: "Inter_500Medium",
            fontSize: 12,
            color: colors.primary,
            marginTop: 8,
          }}
        >
          {link.label}
        </Text>
      </TouchableOpacity>
    );
  };

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
            onPress={() => router.back()}
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
            Hakkında
          </Text>
          <View style={{ width: 40 }} />
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 24 }}
      >
        {/* Logo and Mission */}
        <View
          style={{
            backgroundColor: colors.accent,
            borderRadius: 20,
            padding: 32,
            alignItems: "center",
            marginBottom: 24,
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
            <Shield size={40} color="white" />
          </View>
          <Text
            style={{
              fontFamily: "Inter_700Bold",
              fontSize: 28,
              color: "white",
              textAlign: "center",
              marginBottom: 8,
            }}
          >
            Çay Güvenlik
          </Text>
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 14,
              color: "rgba(255, 255, 255, 0.9)",
              textAlign: "center",
              marginBottom: 4,
            }}
          >
            Versiyon 1.0.0
          </Text>
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 15,
              color: "rgba(255, 255, 255, 0.9)",
              textAlign: "center",
              lineHeight: 22,
              marginTop: 16,
            }}
          >
            Güvenli flört deneyimi için topluluk destekli bir platform
          </Text>
        </View>

        {/* Stats */}
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            marginHorizontal: -6,
            marginBottom: 24,
          }}
        >
          {stats.map((stat, index) => (
            <View
              key={index}
              style={{
                width: "50%",
                marginBottom: 12,
              }}
            >
              <StatCard stat={stat} />
            </View>
          ))}
        </View>

        {/* Mission Statement */}
        <View
          style={{
            backgroundColor: colors.card,
            borderRadius: 16,
            padding: 24,
            marginBottom: 24,
            borderWidth: 1,
            borderColor: colors.border,
          }}
        >
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 20,
              color: colors.primary,
              marginBottom: 12,
            }}
          >
            Misyonumuz
          </Text>
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 15,
              color: colors.secondary,
              lineHeight: 24,
            }}
          >
            Çay Güvenlik olarak, online flört ve tanışma dünyasında güvenliği
            artırmayı hedefliyoruz. Kullanıcılarımızın deneyimlerini paylaşarak
            birbirlerine yardımcı olduğu, şeffaf ve güvenilir bir platform
            oluşturuyoruz.
          </Text>
        </View>

        {/* Features */}
        <Text
          style={{
            fontFamily: "Inter_600SemiBold",
            fontSize: 20,
            color: colors.primary,
            marginBottom: 16,
          }}
        >
          Öne Çıkan Özellikler
        </Text>
        {features.map((feature, index) => (
          <FeatureCard key={index} feature={feature} />
        ))}

        {/* Team */}
        <Text
          style={{
            fontFamily: "Inter_600SemiBold",
            fontSize: 20,
            color: colors.primary,
            marginBottom: 16,
            marginTop: 8,
          }}
        >
          Ekibimiz
        </Text>
        <View
          style={{
            backgroundColor: colors.card,
            borderRadius: 16,
            padding: 20,
            marginBottom: 24,
            borderWidth: 1,
            borderColor: colors.border,
          }}
        >
          {team.map((member, index) => (
            <View
              key={index}
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 12,
                borderBottomWidth: index < team.length - 1 ? 1 : 0,
                borderBottomColor: colors.border,
              }}
            >
              <View
                style={{
                  width: 48,
                  height: 48,
                  backgroundColor: colors.background,
                  borderRadius: 24,
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 16,
                }}
              >
                <Users size={24} color={colors.accent} />
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontFamily: "Inter_600SemiBold",
                    fontSize: 16,
                    color: colors.primary,
                  }}
                >
                  {member.name}
                </Text>
                <Text
                  style={{
                    fontFamily: "Inter_400Regular",
                    fontSize: 14,
                    color: colors.secondary,
                    marginTop: 2,
                  }}
                >
                  {member.role}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Social Links */}
        <Text
          style={{
            fontFamily: "Inter_600SemiBold",
            fontSize: 20,
            color: colors.primary,
            marginBottom: 16,
          }}
        >
          Bizi Takip Edin
        </Text>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            marginHorizontal: -6,
            marginBottom: 24,
          }}
        >
          {socialLinks.map((link, index) => (
            <View key={index} style={{ width: "50%", marginBottom: 12 }}>
              <SocialLink link={link} />
            </View>
          ))}
        </View>

        {/* Contact CTA */}
        <View
          style={{
            backgroundColor: colors.accentLight,
            borderRadius: 16,
            padding: 20,
            borderLeftWidth: 4,
            borderLeftColor: colors.accent,
          }}
        >
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 16,
              color: colors.primary,
              marginBottom: 8,
            }}
          >
            Sorularınız mı var?
          </Text>
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 14,
              color: colors.secondary,
              lineHeight: 20,
              marginBottom: 16,
            }}
          >
            Bize ulaşmaktan çekinmeyin. Ekibimiz size yardımcı olmaktan mutluluk
            duyar.
          </Text>
          <TouchableOpacity
            onPress={() => router.back()}
            style={{
              backgroundColor: colors.accent,
              paddingHorizontal: 20,
              paddingVertical: 12,
              borderRadius: 12,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
            activeOpacity={0.8}
          >
            <Mail size={18} color="white" style={{ marginRight: 8 }} />
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 14,
                color: "white",
              }}
            >
              İletişime Geç
            </Text>
          </TouchableOpacity>
        </View>

        {/* Copyright */}
        <Text
          style={{
            fontFamily: "Inter_400Regular",
            fontSize: 12,
            color: colors.secondary,
            textAlign: "center",
            marginTop: 32,
          }}
        >
          © 2024 Çay Güvenlik. Tüm hakları saklıdır.
        </Text>
      </ScrollView>
    </View>
  );
}
