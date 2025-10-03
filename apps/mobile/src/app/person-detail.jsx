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
  ArrowLeft,
  User,
  Phone,
  Mail,
  Instagram,
  MapPin,
  Calendar,
  AlertTriangle,
  Shield,
  ThumbsUp,
  ThumbsDown,
  Star,
  Flag,
  Share2,
  Bookmark,
  ExternalLink,
} from "lucide-react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useSafeBack } from '@/utils/navigation';

export default function PersonDetailScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const safeBack = useSafeBack();
  const params = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [isSaved, setIsSaved] = useState(false);

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
    dangerLight: "#FEE2E2",
    warning: "#F59E0B",
    warningLight: "#FEF3C7",
    yellow: "#F59E0B",
  };

  // Mock data - gerçek uygulamada API'den gelecek
  const personData = {
    name: params.name || "Ahmet Yılmaz",
    phone: params.phone || "+90 555 123 45 67",
    email: "ahmet@example.com",
    instagram: "@ahmet_istanbul",
    location: "İstanbul, Türkiye",
    joinDate: "Ocak 2024",
    riskLevel: "low", // low, medium, high
    rating: 4.5,
    reviewCount: 24,
    positiveReviews: 20,
    negativeReviews: 4,
    verifiedInfo: true,
    lastSeen: "2 gün önce",
  };

  const getRiskColor = (level) => {
    switch (level) {
      case "low":
        return colors.accent;
      case "medium":
        return colors.warning;
      case "high":
        return colors.danger;
      default:
        return colors.secondary;
    }
  };

  const getRiskText = (level) => {
    switch (level) {
      case "low":
        return "Düşük Risk";
      case "medium":
        return "Orta Risk";
      case "high":
        return "Yüksek Risk";
      default:
        return "Bilinmiyor";
    }
  };

  const getRiskBackground = (level) => {
    switch (level) {
      case "low":
        return colors.accentLight;
      case "medium":
        return colors.warningLight;
      case "high":
        return colors.dangerLight;
      default:
        return colors.border;
    }
  };

  const InfoItem = ({ icon: IconComponent, label, value, iconColor }) => (
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
          backgroundColor: colors.background,
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
            fontFamily: "Inter_400Regular",
            fontSize: 12,
            color: colors.secondary,
            marginBottom: 4,
          }}
        >
          {label}
        </Text>
        <Text
          style={{
            fontFamily: "Inter_500Medium",
            fontSize: 16,
            color: colors.primary,
          }}
        >
          {value}
        </Text>
      </View>
    </View>
  );

  const StatCard = ({ icon: IconComponent, label, value, color }) => (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.card,
        borderRadius: 12,
        padding: 16,
        alignItems: "center",
        marginHorizontal: 6,
        borderWidth: 1,
        borderColor: colors.border,
      }}
    >
      <IconComponent size={24} color={color} />
      <Text
        style={{
          fontFamily: "Inter_700Bold",
          fontSize: 20,
          color: colors.primary,
          marginTop: 8,
        }}
      >
        {value}
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
        {label}
      </Text>
    </View>
  );

  const ActionButton = ({ icon: IconComponent, label, onPress, variant = "default" }) => (
    <TouchableOpacity
      style={{
        flex: 1,
        backgroundColor: variant === "primary" ? colors.accent : colors.card,
        borderRadius: 12,
        padding: 16,
        alignItems: "center",
        marginHorizontal: 6,
        borderWidth: variant === "default" ? 1 : 0,
        borderColor: colors.border,
      }}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <IconComponent
        size={20}
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
        {label}
      </Text>
    </TouchableOpacity>
  );

  const renderStars = (rating) => {
    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {Array.from({ length: 5 }, (_, index) => (
          <Star
            key={index}
            size={16}
            color={index < Math.floor(rating) ? colors.yellow : colors.border}
            fill={index < Math.floor(rating) ? colors.yellow : "transparent"}
            style={{ marginRight: 4 }}
          />
        ))}
        <Text
          style={{
            fontFamily: "Inter_600SemiBold",
            fontSize: 16,
            color: colors.primary,
            marginLeft: 8,
          }}
        >
          {rating}
        </Text>
      </View>
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
            Profil Detayı
          </Text>
          <TouchableOpacity
            onPress={() => setIsSaved(!isSaved)}
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
            <Bookmark
              size={20}
              color={isSaved ? colors.accent : colors.primary}
              fill={isSaved ? colors.accent : "transparent"}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Profile Header Card */}
        <View style={{ paddingHorizontal: 24, paddingTop: 24 }}>
          <View
            style={{
              backgroundColor: colors.card,
              borderRadius: 20,
              padding: 24,
              shadowColor: isDark ? "#000" : "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: isDark ? 0.5 : 0.1,
              shadowRadius: 12,
              elevation: 4,
            }}
          >
            <View style={{ alignItems: "center", marginBottom: 20 }}>
              <View
                style={{
                  width: 100,
                  height: 100,
                  backgroundColor: colors.background,
                  borderRadius: 50,
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 16,
                  borderWidth: 3,
                  borderColor: getRiskColor(personData.riskLevel),
                }}
              >
                <User size={48} color={colors.primary} />
              </View>
              <Text
                style={{
                  fontFamily: "Inter_700Bold",
                  fontSize: 24,
                  color: colors.primary,
                  textAlign: "center",
                  marginBottom: 8,
                }}
              >
                {personData.name}
              </Text>
              <View
                style={{
                  backgroundColor: getRiskBackground(personData.riskLevel),
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderRadius: 20,
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 16,
                }}
              >
                <Shield
                  size={16}
                  color={getRiskColor(personData.riskLevel)}
                  style={{ marginRight: 6 }}
                />
                <Text
                  style={{
                    fontFamily: "Inter_600SemiBold",
                    fontSize: 14,
                    color: getRiskColor(personData.riskLevel),
                  }}
                >
                  {getRiskText(personData.riskLevel)}
                </Text>
              </View>
              {renderStars(personData.rating)}
              <Text
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 14,
                  color: colors.secondary,
                  marginTop: 4,
                }}
              >
                {personData.reviewCount} değerlendirme
              </Text>
            </View>

            {/* Statistics */}
            <View
              style={{
                flexDirection: "row",
                marginTop: 16,
                marginHorizontal: -6,
              }}
            >
              <StatCard
                icon={ThumbsUp}
                label="Olumlu"
                value={personData.positiveReviews}
                color={colors.accent}
              />
              <StatCard
                icon={ThumbsDown}
                label="Olumsuz"
                value={personData.negativeReviews}
                color={colors.danger}
              />
              <StatCard
                icon={Calendar}
                label="Son Görülme"
                value={personData.lastSeen}
                color={colors.secondary}
              />
            </View>
          </View>
        </View>

        {/* Contact Information */}
        <View style={{ paddingHorizontal: 24, marginTop: 24 }}>
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 18,
              color: colors.primary,
              marginBottom: 16,
            }}
          >
            İletişim Bilgileri
          </Text>
          <View
            style={{
              backgroundColor: colors.card,
              borderRadius: 16,
              padding: 20,
              shadowColor: isDark ? "#000" : "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: isDark ? 0.5 : 0.1,
              shadowRadius: 8,
              elevation: 2,
            }}
          >
            <InfoItem
              icon={Phone}
              label="Telefon"
              value={personData.phone}
              iconColor={colors.accent}
            />
            <InfoItem
              icon={Mail}
              label="E-posta"
              value={personData.email}
              iconColor={colors.accent}
            />
            <InfoItem
              icon={Instagram}
              label="Instagram"
              value={personData.instagram}
              iconColor={colors.accent}
            />
            <InfoItem
              icon={MapPin}
              label="Konum"
              value={personData.location}
              iconColor={colors.accent}
            />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingTop: 16,
              }}
            >
              <View
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: colors.background,
                  borderRadius: 20,
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 16,
                }}
              >
                <Calendar size={20} color={colors.accent} />
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontFamily: "Inter_400Regular",
                    fontSize: 12,
                    color: colors.secondary,
                    marginBottom: 4,
                  }}
                >
                  Kayıt Tarihi
                </Text>
                <Text
                  style={{
                    fontFamily: "Inter_500Medium",
                    fontSize: 16,
                    color: colors.primary,
                  }}
                >
                  {personData.joinDate}
                </Text>
              </View>
              {personData.verifiedInfo && (
                <View
                  style={{
                    backgroundColor: colors.accentLight,
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    borderRadius: 12,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Shield size={14} color={colors.accent} style={{ marginRight: 4 }} />
                  <Text
                    style={{
                      fontFamily: "Inter_600SemiBold",
                      fontSize: 12,
                      color: colors.accent,
                    }}
                  >
                    Doğrulandı
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* Recent Reviews Preview */}
        <View style={{ paddingHorizontal: 24, marginTop: 24 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 18,
                color: colors.primary,
              }}
            >
              Son Yorumlar
            </Text>
            <TouchableOpacity
              onPress={() => router.push("/(tabs)/reviews")}
              activeOpacity={0.7}
            >
              <Text
                style={{
                  fontFamily: "Inter_500Medium",
                  fontSize: 14,
                  color: colors.accent,
                }}
              >
                Tümünü Gör
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: colors.card,
              borderRadius: 16,
              padding: 20,
              shadowColor: isDark ? "#000" : "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: isDark ? 0.5 : 0.1,
              shadowRadius: 8,
              elevation: 2,
            }}
            onPress={() => router.push("/review-detail")}
            activeOpacity={0.9}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 12,
              }}
            >
              {renderStars(5)}
              <Text
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 12,
                  color: colors.secondary,
                }}
              >
                2 gün önce
              </Text>
            </View>
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 14,
                color: colors.primary,
                lineHeight: 20,
              }}
            >
              Çok güvenilir ve dürüst bir kişi. Buluşmamız çok güzel geçti,
              kendimi güvende hissettim.
            </Text>
          </TouchableOpacity>
        </View>

        {/* Warning Section */}
        {personData.riskLevel !== "low" && (
          <View style={{ paddingHorizontal: 24, marginTop: 24 }}>
            <View
              style={{
                backgroundColor:
                  personData.riskLevel === "high"
                    ? colors.dangerLight
                    : colors.warningLight,
                borderRadius: 16,
                padding: 20,
                borderLeftWidth: 4,
                borderLeftColor:
                  personData.riskLevel === "high" ? colors.danger : colors.warning,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-start",
                }}
              >
                <AlertTriangle
                  size={24}
                  color={
                    personData.riskLevel === "high" ? colors.danger : colors.warning
                  }
                  style={{ marginRight: 12 }}
                />
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontFamily: "Inter_600SemiBold",
                      fontSize: 16,
                      color: colors.primary,
                      marginBottom: 8,
                    }}
                  >
                    Dikkat!
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Inter_400Regular",
                      fontSize: 14,
                      color: colors.primary,
                      lineHeight: 20,
                    }}
                  >
                    {personData.riskLevel === "high"
                      ? "Bu profil hakkında olumsuz yorumlar bulunmaktadır. Lütfen dikkatli olun ve buluşmalarda güvenlik önlemlerinizi alın."
                      : "Bu profil hakkında bazı uyarılar bulunmaktadır. Lütfen buluşmalarda dikkatli olun."}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Bottom Actions */}
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: colors.white,
          paddingTop: 16,
          paddingBottom: insets.bottom + 16,
          paddingHorizontal: 24,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 8,
        }}
      >
        <View style={{ flexDirection: "row", marginHorizontal: -6 }}>
          <ActionButton
            icon={Flag}
            label="Şikayet Et"
            onPress={() => router.push("/report")}
          />
          <ActionButton
            icon={Share2}
            label="Paylaş"
            onPress={() => {}}
          />
          <ActionButton
            icon={ExternalLink}
            label="Yorum Yaz"
            onPress={() => router.push("/add-review")}
            variant="primary"
          />
        </View>
      </View>
    </View>
  );
}
