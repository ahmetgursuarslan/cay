import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  useColorScheme,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  ArrowLeft,
  Flag,
  AlertTriangle,
  User,
  MessageSquare,
  Shield,
  CheckCircle,
  X,
  FileText,
} from "lucide-react-native";
import { useRouter } from "expo-router";
import { useSafeBack } from '@/utils/navigation';
// Fonts loaded globally; avoid per-screen gating

export default function ReportScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const safeBack = useSafeBack();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const [reportType, setReportType] = useState("");
  const [targetName, setTargetName] = useState("");
  const [reportReason, setReportReason] = useState([]);
  const [description, setDescription] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);

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
  };

  const reportTypes = [
    { value: "person", label: "Kişi Şikayeti", icon: User },
    { value: "review", label: "Yorum Şikayeti", icon: MessageSquare },
  ];

  const reportReasons = [
    "Sahte profil",
    "Dolandırıcılık",
    "Taciz veya tehdit",
    "Uygunsuz içerik",
    "Yanıltıcı bilgi",
    "Spam",
    "Diğer",
  ];

  const isFormValid = () => {
    return (
      reportType &&
      targetName.trim() &&
      reportReason.length > 0 &&
      description.trim().length >= 20
    );
  };

  const handleSubmit = () => {
    if (isFormValid()) {
  // API call here
  safeBack();
    }
  };

  const toggleReason = (reason) => {
    if (reportReason.includes(reason)) {
      setReportReason(reportReason.filter((r) => r !== reason));
    } else {
      setReportReason([...reportReason, reason]);
    }
  };

  const FormSection = ({ title, children, required = false }) => (
    <View style={{ marginBottom: 24 }}>
      <Text
        style={{
          fontFamily: "Inter_600SemiBold",
          fontSize: 16,
          color: colors.primary,
          marginBottom: 12,
        }}
      >
        {title}
        {required && (
          <Text style={{ color: colors.danger }}> *</Text>
        )}
      </Text>
      {children}
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
              Şikayet Et
            </Text>
            <View style={{ width: 40 }} />
          </View>
        </View>

        <ScrollView
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ padding: 24, paddingBottom: 100 }}
        >
          {/* Warning Banner */}
          <View
            style={{
              backgroundColor: colors.dangerLight,
              borderRadius: 12,
              padding: 16,
              marginBottom: 24,
              borderLeftWidth: 4,
              borderLeftColor: colors.danger,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
              <AlertTriangle
                size={20}
                color={colors.danger}
                style={{ marginRight: 12, marginTop: 2 }}
              />
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontFamily: "Inter_600SemiBold",
                    fontSize: 14,
                    color: colors.primary,
                    marginBottom: 4,
                  }}
                >
                  Önemli Uyarı
                </Text>
                <Text
                  style={{
                    fontFamily: "Inter_400Regular",
                    fontSize: 13,
                    color: colors.primary,
                    lineHeight: 18,
                  }}
                >
                  Şikayetiniz incelenecek ve gerekli işlemler yapılacaktır.
                  Yanlış bilgi vermek yasal sonuçlar doğurabilir.
                </Text>
              </View>
            </View>
          </View>

          {/* Report Type */}
          <FormSection title="Şikayet Türü" required>
            <View style={{ gap: 12 }}>
              {reportTypes.map((type) => {
                const Icon = type.icon;
                const isSelected = reportType === type.value;
                return (
                  <TouchableOpacity
                    key={type.value}
                    onPress={() => setReportType(type.value)}
                    style={{
                      backgroundColor: isSelected
                        ? colors.dangerLight
                        : colors.card,
                      borderRadius: 12,
                      padding: 16,
                      borderWidth: 2,
                      borderColor: isSelected ? colors.danger : colors.border,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                    activeOpacity={0.8}
                  >
                    <View
                      style={{
                        width: 48,
                        height: 48,
                        backgroundColor: isSelected
                          ? colors.danger
                          : colors.background,
                        borderRadius: 24,
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: 16,
                      }}
                    >
                      <Icon
                        size={24}
                        color={isSelected ? "white" : colors.danger}
                      />
                    </View>
                    <Text
                      style={{
                        fontFamily: "Inter_600SemiBold",
                        fontSize: 16,
                        color: colors.primary,
                      }}
                    >
                      {type.label}
                    </Text>
                    {isSelected && (
                      <View style={{ marginLeft: "auto" }}>
                        <CheckCircle size={24} color={colors.danger} />
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </FormSection>

          {/* Target Name */}
          <FormSection
            title={
              reportType === "person"
                ? "Şikayet Edilen Kişi"
                : reportType === "review"
                ? "Şikayet Edilen Yorum"
                : "Hedef"
            }
            required
          >
            <View
              style={{
                backgroundColor: colors.card,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: colors.border,
                padding: 16,
              }}
            >
              <TextInput
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 15,
                  color: colors.primary,
                }}
                placeholder={
                  reportType === "person"
                    ? "Kişinin adı, telefonu veya kullanıcı adı"
                    : "Yorum ID veya açıklama"
                }
                placeholderTextColor={colors.secondary}
                value={targetName}
                onChangeText={setTargetName}
              />
            </View>
          </FormSection>

          {/* Report Reasons */}
          <FormSection title="Şikayet Nedenleri" required>
            <View style={{ gap: 8 }}>
              {reportReasons.map((reason) => {
                const isSelected = reportReason.includes(reason);
                return (
                  <TouchableOpacity
                    key={reason}
                    onPress={() => toggleReason(reason)}
                    style={{
                      backgroundColor: isSelected
                        ? colors.danger
                        : colors.card,
                      borderRadius: 12,
                      padding: 16,
                      borderWidth: 1,
                      borderColor: isSelected ? colors.danger : colors.border,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                    activeOpacity={0.8}
                  >
                    <Text
                      style={{
                        fontFamily: "Inter_500Medium",
                        fontSize: 15,
                        color: isSelected ? "white" : colors.primary,
                      }}
                    >
                      {reason}
                    </Text>
                    <View
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: 12,
                        borderWidth: 2,
                        borderColor: isSelected ? "white" : colors.border,
                        backgroundColor: isSelected ? "white" : "transparent",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {isSelected && (
                        <CheckCircle size={16} color={colors.danger} />
                      )}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </FormSection>

          {/* Description */}
          <FormSection title="Detaylı Açıklama (En az 20 karakter)" required>
            <View
              style={{
                backgroundColor: colors.card,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: colors.border,
                padding: 16,
              }}
            >
              <TextInput
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 15,
                  color: colors.primary,
                  minHeight: 120,
                  textAlignVertical: "top",
                }}
                placeholder="Şikayetinizi detaylı olarak açıklayın. Olayın ne zaman ve nasıl gerçekleştiğini belirtin..."
                placeholderTextColor={colors.secondary}
                value={description}
                onChangeText={setDescription}
                multiline
                maxLength={1000}
              />
              <Text
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 12,
                  color: colors.secondary,
                  textAlign: "right",
                  marginTop: 8,
                }}
              >
                {description.length}/1000
              </Text>
            </View>
          </FormSection>

          {/* Contact Info */}
          <FormSection title="İletişim Bilgileriniz (Opsiyonel)">
            <View
              style={{
                backgroundColor: colors.card,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: colors.border,
                padding: 16,
              }}
            >
              <TextInput
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 15,
                  color: colors.primary,
                }}
                placeholder="E-posta veya telefon (Size ulaşmamız gerekirse)"
                placeholderTextColor={colors.secondary}
                value={contactInfo}
                onChangeText={setContactInfo}
                keyboardType="email-address"
              />
            </View>
          </FormSection>

          {/* Anonymous Option */}
          <TouchableOpacity
            onPress={() => setIsAnonymous(!isAnonymous)}
            style={{
              backgroundColor: colors.card,
              borderRadius: 12,
              padding: 16,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              borderWidth: 1,
              borderColor: colors.border,
            }}
            activeOpacity={0.8}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 15,
                  color: colors.primary,
                  marginBottom: 4,
                }}
              >
                Anonim Şikayet
              </Text>
              <Text
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 13,
                  color: colors.secondary,
                  lineHeight: 18,
                }}
              >
                Kimlik bilgileriniz gizli kalacak
              </Text>
            </View>
            <View
              style={{
                width: 24,
                height: 24,
                borderRadius: 12,
                borderWidth: 2,
                borderColor: isAnonymous ? colors.accent : colors.border,
                backgroundColor: isAnonymous ? colors.accent : "transparent",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {isAnonymous && <CheckCircle size={16} color="white" />}
            </View>
          </TouchableOpacity>

          {/* Guidelines */}
          <View
            style={{
              backgroundColor: colors.card,
              borderRadius: 12,
              padding: 16,
              marginTop: 24,
              borderWidth: 1,
              borderColor: colors.border,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 12,
              }}
            >
              <Shield size={20} color={colors.accent} />
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 15,
                  color: colors.primary,
                  marginLeft: 8,
                }}
              >
                Şikayet Süreci
              </Text>
            </View>
            <View style={{ gap: 8 }}>
              <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
                <Text
                  style={{
                    fontFamily: "Inter_600SemiBold",
                    fontSize: 13,
                    color: colors.accent,
                    marginRight: 8,
                  }}
                >
                  1.
                </Text>
                <Text
                  style={{
                    fontFamily: "Inter_400Regular",
                    fontSize: 13,
                    color: colors.secondary,
                    lineHeight: 18,
                    flex: 1,
                  }}
                >
                  Şikayetiniz 24 saat içinde incelenecek
                </Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
                <Text
                  style={{
                    fontFamily: "Inter_600SemiBold",
                    fontSize: 13,
                    color: colors.accent,
                    marginRight: 8,
                  }}
                >
                  2.
                </Text>
                <Text
                  style={{
                    fontFamily: "Inter_400Regular",
                    fontSize: 13,
                    color: colors.secondary,
                    lineHeight: 18,
                    flex: 1,
                  }}
                >
                  Gerekirse sizinle iletişime geçilecek
                </Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
                <Text
                  style={{
                    fontFamily: "Inter_600SemiBold",
                    fontSize: 13,
                    color: colors.accent,
                    marginRight: 8,
                  }}
                >
                  3.
                </Text>
                <Text
                  style={{
                    fontFamily: "Inter_400Regular",
                    fontSize: 13,
                    color: colors.secondary,
                    lineHeight: 18,
                    flex: 1,
                  }}
                >
                  Sonuç hakkında bilgilendirileceksiniz
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Bottom Submit Button */}
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
          <TouchableOpacity
            onPress={handleSubmit}
            disabled={!isFormValid()}
            style={{
              backgroundColor: isFormValid() ? colors.danger : colors.border,
              borderRadius: 12,
              padding: 16,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
            activeOpacity={0.8}
          >
            <Flag size={20} color="white" style={{ marginRight: 8 }} />
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 16,
                color: "white",
              }}
            >
              Şikayeti Gönder
            </Text>
          </TouchableOpacity>
        </View>
      </View>
  );
}
