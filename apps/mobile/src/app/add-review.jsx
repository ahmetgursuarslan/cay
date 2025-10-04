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
  Star,
  MapPin,
  Calendar,
  MessageCircle,
  Shield,
  AlertTriangle,
  CheckCircle,
  X,
} from "lucide-react-native";
import { useRouter } from "expo-router";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";

export default function AddReviewScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const [targetName, setTargetName] = useState("");
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [location, setLocation] = useState("");
  const [meetingDate, setMeetingDate] = useState("");
  const [meetingType, setMeetingType] = useState("");
  const [safetyLevel, setSafetyLevel] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);

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
    danger: "#EF4444",
    warning: "#F59E0B",
    yellow: "#F59E0B",
  };

  const meetingTypes = [
    "Kahve Buluşması",
    "Yemek",
    "Sinema",
    "Yürüyüş",
    "Alışveriş",
    "Diğer",
  ];

  const safetyLevels = [
    { value: "safe", label: "Güvenli", icon: Shield, color: colors.accent },
    { value: "warning", label: "Dikkatli Ol", icon: AlertTriangle, color: colors.warning },
    { value: "danger", label: "Tehlikeli", icon: AlertTriangle, color: colors.danger },
  ];

  const isFormValid = () => {
    return (
      targetName.trim() &&
      rating > 0 &&
      reviewText.trim().length >= 20 &&
      safetyLevel
    );
  };

  const handleSubmit = () => {
    if (isFormValid()) {
      // API call here
      router.back();
    }
  };

  const renderStars = () => {
    return (
      <View style={{ flexDirection: "row", justifyContent: "center", gap: 8 }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity
            key={star}
            onPress={() => setRating(star)}
            activeOpacity={0.8}
          >
            <Star
              size={40}
              color={star <= rating ? colors.yellow : colors.border}
              fill={star <= rating ? colors.yellow : "transparent"}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const FormSection = ({ title, children }) => (
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
      </Text>
      {children}
    </View>
  );

  const InputField = ({
    placeholder,
    value,
    onChangeText,
    multiline = false,
    maxLength,
    icon: IconComponent,
  }) => (
    <View
      style={{
        backgroundColor: colors.card,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.border,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: multiline ? "flex-start" : "center",
          padding: 16,
        }}
      >
        {IconComponent && (
          <IconComponent
            size={20}
            color={colors.secondary}
            style={{ marginRight: 12, marginTop: multiline ? 2 : 0 }}
          />
        )}
        <View style={{ flex: 1 }}>
          <TextInput
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 15,
              color: colors.primary,
              minHeight: multiline ? 100 : undefined,
              textAlignVertical: multiline ? "top" : "center",
            }}
            placeholder={placeholder}
            placeholderTextColor={colors.secondary}
            value={value}
            onChangeText={onChangeText}
            multiline={multiline}
            maxLength={maxLength}
          />
          {maxLength && (
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 12,
                color: colors.secondary,
                textAlign: "right",
                marginTop: 4,
              }}
            >
              {value.length}/{maxLength}
            </Text>
          )}
        </View>
      </View>
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
              Yeni Yorum Ekle
            </Text>
            <View style={{ width: 40 }} />
          </View>
        </View>

        <ScrollView
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 24, paddingBottom: 100 }}
        >
          {/* Info Banner */}
          <View
            style={{
              backgroundColor: colors.accentLight,
              borderRadius: 12,
              padding: 16,
              marginBottom: 24,
              borderLeftWidth: 4,
              borderLeftColor: colors.accent,
            }}
          >
            <Text
              style={{
                fontFamily: "Inter_500Medium",
                fontSize: 14,
                color: colors.primary,
                lineHeight: 20,
              }}
            >
              Yorumunuz diğer kullanıcıların güvenli bir deneyim yaşaması için
              önemlidir. Lütfen dürüst ve yapıcı olun.
            </Text>
          </View>

          {/* Target Person Name */}
          <FormSection title="Kişi Bilgileri *">
            <InputField
              placeholder="Kişinin adı ve soyadı"
              value={targetName}
              onChangeText={setTargetName}
              icon={null}
            />
          </FormSection>

          {/* Rating */}
          <FormSection title="Genel Değerlendirme *">
            <View
              style={{
                backgroundColor: colors.card,
                borderRadius: 12,
                padding: 24,
                borderWidth: 1,
                borderColor: colors.border,
              }}
            >
              {renderStars()}
              {rating > 0 && (
                <Text
                  style={{
                    fontFamily: "Inter_500Medium",
                    fontSize: 14,
                    color: colors.secondary,
                    textAlign: "center",
                    marginTop: 12,
                  }}
                >
                  {rating === 1 && "Çok Kötü"}
                  {rating === 2 && "Kötü"}
                  {rating === 3 && "Orta"}
                  {rating === 4 && "İyi"}
                  {rating === 5 && "Mükemmel"}
                </Text>
              )}
            </View>
          </FormSection>

          {/* Safety Level */}
          <FormSection title="Güvenlik Seviyesi *">
            <View style={{ gap: 12 }}>
              {safetyLevels.map((level) => {
                const Icon = level.icon;
                const isSelected = safetyLevel === level.value;
                return (
                  <TouchableOpacity
                    key={level.value}
                    onPress={() => setSafetyLevel(level.value)}
                    style={{
                      backgroundColor: isSelected
                        ? `${level.color}20`
                        : colors.card,
                      borderRadius: 12,
                      padding: 16,
                      borderWidth: 2,
                      borderColor: isSelected ? level.color : colors.border,
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
                          ? level.color
                          : colors.background,
                        borderRadius: 24,
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: 16,
                      }}
                    >
                      <Icon
                        size={24}
                        color={isSelected ? "white" : level.color}
                      />
                    </View>
                    <Text
                      style={{
                        fontFamily: "Inter_600SemiBold",
                        fontSize: 16,
                        color: isSelected ? level.color : colors.primary,
                      }}
                    >
                      {level.label}
                    </Text>
                    {isSelected && (
                      <View style={{ marginLeft: "auto" }}>
                        <CheckCircle size={24} color={level.color} />
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </FormSection>

          {/* Review Text */}
          <FormSection title="Yorumunuz * (En az 20 karakter)">
            <InputField
              placeholder="Deneyiminizi detaylı olarak anlatın..."
              value={reviewText}
              onChangeText={setReviewText}
              multiline
              maxLength={1000}
            />
          </FormSection>

          {/* Meeting Details */}
          <FormSection title="Buluşma Detayları (Opsiyonel)">
            <View style={{ gap: 12 }}>
              <InputField
                placeholder="Buluşma konumu"
                value={location}
                onChangeText={setLocation}
                icon={MapPin}
              />
              <InputField
                placeholder="Buluşma tarihi (örn: 15 Aralık 2024)"
                value={meetingDate}
                onChangeText={setMeetingDate}
                icon={Calendar}
              />
              <View
                style={{
                  backgroundColor: colors.card,
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: colors.border,
                  padding: 16,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 12,
                  }}
                >
                  <MessageCircle size={20} color={colors.secondary} />
                  <Text
                    style={{
                      fontFamily: "Inter_500Medium",
                      fontSize: 14,
                      color: colors.primary,
                      marginLeft: 12,
                    }}
                  >
                    Buluşma Türü
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    gap: 8,
                  }}
                >
                  {meetingTypes.map((type) => (
                    <TouchableOpacity
                      key={type}
                      onPress={() => setMeetingType(type)}
                      style={{
                        backgroundColor:
                          meetingType === type
                            ? colors.accent
                            : colors.background,
                        paddingHorizontal: 16,
                        paddingVertical: 8,
                        borderRadius: 20,
                        borderWidth: 1,
                        borderColor:
                          meetingType === type ? colors.accent : colors.border,
                      }}
                      activeOpacity={0.8}
                    >
                      <Text
                        style={{
                          fontFamily: "Inter_500Medium",
                          fontSize: 13,
                          color:
                            meetingType === type ? "white" : colors.primary,
                        }}
                      >
                        {type}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
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
                Anonim Yorum
              </Text>
              <Text
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 13,
                  color: colors.secondary,
                  lineHeight: 18,
                }}
              >
                İsminiz gizli kalacak ve diğer kullanıcılar göremeyecek
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
        </ScrollView>

        {/* Bottom Submit Button */}
        <View
          pointerEvents="box-none"
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
              backgroundColor: isFormValid() ? colors.accent : colors.border,
              borderRadius: 12,
              padding: 16,
              alignItems: "center",
            }}
            activeOpacity={0.8}
          >
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 16,
                color: "white",
              }}
            >
              Yorumu Gönder
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    
  );
}
