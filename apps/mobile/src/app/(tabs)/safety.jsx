import React, { useState } from "react";
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
  Shield,
  AlertTriangle,
  MapPin,
  Phone,
  Eye,
  Users,
  Clock,
  Camera,
  MessageCircle,
  ChevronRight,
  ExternalLink,
  AlertOctagon,
} from "lucide-react-native";
import { useRouter } from "expo-router";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";

export default function SafetyScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [showHeaderBorder, setShowHeaderBorder] = useState(false);

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

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
    dangerLight: "#FEE2E2",
    warning: "#F59E0B",
    warningLight: "#FEF3C7",
    blue: "#3B82F6",
    blueLight: "#DBEAFE",
  };

  const handleScroll = (event) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    setShowHeaderBorder(scrollY > 0);
  };

  const SafetyTipCard = ({
    icon: IconComponent,
    title,
    description,
    color,
    backgroundColor,
    tips = [],
    onPress,
  }) => (
    <TouchableOpacity
      style={{
        backgroundColor: backgroundColor,
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        shadowColor: isDark ? "#000" : "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: isDark ? 0.5 : 0.1,
        shadowRadius: 8,
        elevation: 2,
      }}
      onPress={onPress}
      activeOpacity={0.95}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          marginBottom: 16,
        }}
      >
        <View
          style={{
            width: 48,
            height: 48,
            backgroundColor: color,
            borderRadius: 24,
            alignItems: "center",
            justifyContent: "center",
            marginRight: 16,
          }}
        >
          <IconComponent size={24} color="white" />
        </View>
        <View style={{ flex: 1 }}>
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
        </View>
        <ChevronRight size={20} color={colors.secondary} />
      </View>

      {tips.length > 0 && (
        <View style={{ paddingLeft: 64 }}>
          {tips.map((tip, index) => (
            <View
              key={index}
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                marginBottom: 8,
              }}
            >
              <View
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: color,
                  marginRight: 12,
                  marginTop: 8,
                }}
              />
              <Text
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 13,
                  color: colors.primary,
                  lineHeight: 18,
                  flex: 1,
                }}
              >
                {tip}
              </Text>
            </View>
          ))}
        </View>
      )}
    </TouchableOpacity>
  );

  const EmergencyContact = ({ name, number, description }) => (
    <TouchableOpacity
      style={{
        backgroundColor: colors.card,
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        flexDirection: "row",
        alignItems: "center",
        borderLeftWidth: 4,
        borderLeftColor: colors.danger,
      }}
      activeOpacity={0.8}
    >
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontFamily: "Inter_600SemiBold",
            fontSize: 16,
            color: colors.primary,
            marginBottom: 4,
          }}
        >
          {name}
        </Text>
        <Text
          style={{
            fontFamily: "Inter_500Medium",
            fontSize: 14,
            color: colors.danger,
            marginBottom: 2,
          }}
        >
          {number}
        </Text>
        <Text
          style={{
            fontFamily: "Inter_400Regular",
            fontSize: 12,
            color: colors.secondary,
          }}
        >
          {description}
        </Text>
      </View>
      <Phone size={20} color={colors.danger} />
    </TouchableOpacity>
  );

  const RedFlagItem = ({ flag, severity }) => {
    const getSeverityColor = (severity) => {
      switch (severity) {
        case "high":
          return colors.danger;
        case "medium":
          return colors.warning;
        case "low":
          return colors.blue;
        default:
          return colors.secondary;
      }
    };

    const getSeverityText = (severity) => {
      switch (severity) {
        case "high":
          return "Yüksek Risk";
        case "medium":
          return "Orta Risk";
        case "low":
          return "Düşük Risk";
        default:
          return "Bilinmiyor";
      }
    };

    return (
      <View
        style={{
          backgroundColor: colors.card,
          borderRadius: 12,
          padding: 16,
          marginBottom: 12,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: 12,
            height: 12,
            borderRadius: 6,
            backgroundColor: getSeverityColor(severity),
            marginRight: 16,
          }}
        />
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontFamily: "Inter_500Medium",
              fontSize: 14,
              color: colors.primary,
              marginBottom: 4,
            }}
          >
            {flag}
          </Text>
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 12,
              color: getSeverityColor(severity),
            }}
          >
            {getSeverityText(severity)}
          </Text>
        </View>
      </View>
    );
  };

  const redFlags = [
    { flag: "Kişisel bilgileri çok hızlı istiyor", severity: "high" },
    { flag: "Buluşma yerini eve davet ediyor", severity: "high" },
    { flag: "Telefon görüşmesi yapmak istemiyor", severity: "medium" },
    { flag: "Sosyal medya hesapları çok yeni", severity: "medium" },
    { flag: "Fotoğrafları profesyonel görünüyor", severity: "low" },
    { flag: "İş hakkında net bilgi vermiyor", severity: "medium" },
    { flag: "Para konularını sürekli gündeme getiriyor", severity: "high" },
    { flag: "Aile ve arkadaşlarından bahsetmiyor", severity: "low" },
  ];

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
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text
              style={{
                fontFamily: "Inter_700Bold",
                fontSize: 24,
                color: colors.primary,
                marginBottom: 4,
              }}
            >
              Güvenlik Merkezi
            </Text>
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 14,
                color: colors.secondary,
              }}
            >
              Güvenli flört için önemli ipuçları
            </Text>
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: colors.danger,
              width: 48,
              height: 48,
              borderRadius: 24,
              alignItems: "center",
              justifyContent: "center",
            }}
            activeOpacity={0.8}
          >
            <AlertOctagon size={24} color="white" />
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
        {/* Emergency Contacts */}
        <View style={{ paddingHorizontal: 24, paddingTop: 24 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <AlertOctagon size={20} color={colors.danger} />
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 16,
                color: colors.primary,
                marginLeft: 8,
              }}
            >
              Acil Durum Numaraları
            </Text>
          </View>

          <EmergencyContact
            name="Polis"
            number="155"
            description="Acil durumlar için polis çağırın"
          />

          <EmergencyContact
            name="Kadın Acil Hattı"
            number="183"
            description="Kadına yönelik şiddet için destek hattı"
          />

          <EmergencyContact
            name="Mor Çatı"
            number="0212 292 52 31"
            description="Kadın danışma ve dayanışma merkezi"
          />
        </View>

        {/* Safety Tips */}
        <View style={{ paddingHorizontal: 24, paddingTop: 32 }}>
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 18,
              color: colors.primary,
              marginBottom: 20,
            }}
          >
            Güvenlik İpuçları
          </Text>

          <SafetyTipCard
            icon={MapPin}
            title="İlk Buluşma Yeri"
            description="İlk buluşmayı mutlaka kalabalık ve güvenli bir yerde yapın"
            color={colors.accent}
            backgroundColor={colors.card}
            tips={[
              "Kafe, restoran gibi kalabalık yerler tercih edin",
              "Evlerde buluşmaya hayır deyin",
              "Alkol alan yerlerden kaçının",
              "Ulaşımı kolay olan yerler seçin",
            ]}
          />

          <SafetyTipCard
            icon={Users}
            title="Arkadaş Desteği"
            description="Buluşma öncesi ve sonrası arkadaşlarınızı bilgilendirin"
            color={colors.blue}
            backgroundColor={colors.card}
            tips={[
              "Nerede, kimle buluştuğunuzu paylaşın",
              "Buluşma saatini ve yerini bildirin",
              "Düzenli mesaj atarak durumunuzu bildirin",
              "Acil durum kod kelimesi belirleyin",
            ]}
          />

          <SafetyTipCard
            icon={Eye}
            title="Kişiyi Tanıma"
            description="Buluşmadan önce kişiyi yeterince tanıyın"
            color={colors.warning}
            backgroundColor={colors.card}
            tips={[
              "Video görüşme yaparak gerçek olduğunu doğrulayın",
              "Sosyal medya hesaplarını kontrol edin",
              "Ortak arkadaşlarınız olup olmadığına bakın",
              "İş ve yaşam detaylarını öğrenin",
            ]}
          />

          <SafetyTipCard
            icon={Camera}
            title="Fotoğraf Güvenliği"
            description="Kişisel fotoğraflarınızı paylaşırken dikkatli olun"
            color="#8B5CF6"
            backgroundColor={colors.card}
            tips={[
              "Ev adresinizi gösteren fotoğraflar paylaşmayın",
              "İş yerinizin görüldüğü fotoğraflardan kaçının",
              "Çocuklarınızın fotoğraflarını paylaşmayın",
              "Kişisel eşyalarınızı gösteren detaylardan kaçının",
            ]}
          />
        </View>

        {/* Red Flags Section */}
        <View style={{ paddingHorizontal: 24, paddingTop: 32 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <AlertTriangle size={20} color={colors.danger} />
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 18,
                color: colors.primary,
                marginLeft: 8,
              }}
            >
              Dikkat Etmeniz Gerekenler
            </Text>
          </View>

          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 14,
              color: colors.secondary,
              marginBottom: 20,
              lineHeight: 20,
            }}
          >
            Bu davranışları gösteren kişilerde dikkatli olun ve güvende
            hissetmiyorsanız buluşmayın:
          </Text>

          {redFlags.map((item, index) => (
            <RedFlagItem
              key={index}
              flag={item.flag}
              severity={item.severity}
            />
          ))}
        </View>

        {/* Safety Resources */}
        <View style={{ paddingHorizontal: 24, paddingVertical: 32 }}>
          <View
            style={{
              backgroundColor: colors.accent,
              borderRadius: 20,
              padding: 24,
              alignItems: "center",
            }}
          >
            <Shield size={32} color="white" style={{ marginBottom: 16 }} />
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 18,
                color: "white",
                textAlign: "center",
                marginBottom: 8,
              }}
            >
              Güvenliğiniz Önceliğimiz
            </Text>
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 14,
                color: "rgba(255,255,255,0.8)",
                textAlign: "center",
                lineHeight: 20,
                marginBottom: 20,
              }}
            >
              Şüpheli bir durumla karşılaştığınızda hemen yardım alın.
              Güvenliğiniz her şeyden önemlidir.
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: "white",
                paddingHorizontal: 24,
                paddingVertical: 12,
                borderRadius: 24,
                flexDirection: "row",
                alignItems: "center",
              }}
              activeOpacity={0.9}
            >
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 16,
                  color: colors.accent,
                  marginRight: 8,
                }}
              >
                Destek Al
              </Text>
              <ExternalLink size={16} color={colors.accent} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
