import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, useColorScheme } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MessageSquare, Star, ThumbsUp, ThumbsDown, AlertTriangle, Filter, TrendingUp, Shield } from "lucide-react-native";

export default function ReviewsScreen() {
  const insets = useSafeAreaInsets();
  const systemDark = useColorScheme() === "dark";
  const isDark = systemDark;
  const colors = {
    primary: isDark ? "#FFFFFF" : "#000000",
    secondary: isDark ? "#CCCCCC" : "#6B7280",
    accent: "#16A34A",
    background: isDark ? "#1F1F1F" : "#F9FAFB",
    card: isDark ? "#2A2A2A" : "#FFFFFF",
    border: isDark ? "#374151" : "#E5E7EB",
    danger: "#EF4444",
    warning: "#F59E0B",
    yellow: "#F59E0B",
  };

  const reviews = [
    {
      targetName: "Mehmet K.",
      rating: 2,
      status: "warning",
      comment: "İlk buluşmada çok agresif davrandı ve sürekli para konuştu. Tekrar görüşmek istemiyorum.",
      date: "2 gün önce",
      location: "İstanbul",
      helpful: 12,
      notHelpful: 2,
    },
    {
      targetName: "Ali Y.",
      rating: 5,
      status: "safe",
      comment: "Çok centilmen ve saygılı biri. Buluşmamız güvenli bir kafede oldu ve hiç rahatsız hissetmedim.",
      date: "1 hafta önce",
      location: "Ankara",
      helpful: 24,
      notHelpful: 0,
    },
    {
      targetName: "Emre S.",
      rating: 1,
      status: "danger",
      comment: "Profilindeki fotoğraflar sahte çıktı ve sürekli yalan söylüyor. Çok dikkatli olun!",
      date: "3 gün önce",
      location: "İzmir",
      helpful: 18,
      notHelpful: 1,
    },
  ];

  const StatCard = ({ icon: Icon, label, value, color }) => (
    <View style={{ flex: 1, paddingHorizontal: 6 }}>
      <View style={{ backgroundColor: colors.card, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: colors.border, alignItems: "center" }}>
        <Text style={{ fontFamily: "Inter_700Bold", fontSize: 18, color: colors.primary, marginBottom: 6 }}>{value}</Text>
        <Text style={{ fontFamily: "Inter_400Regular", fontSize: 12, color: colors.secondary, textAlign: "center" }}>{label}</Text>
      </View>
    </View>
  );

  const ReviewCard = ({ review }) => {
    const statusLabel = review.status === "warning" ? "Dikkatli Ol" : review.status === "danger" ? "Tehlike" : "Güvenli";
    const statusColor = review.status === "warning" ? colors.warning : review.status === "danger" ? colors.danger : colors.accent;
    return (
      <View style={{ backgroundColor: colors.card, borderRadius: 16, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: colors.border }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 16, color: colors.primary }}>{review.targetName}</Text>
          <View style={{ borderWidth: 1, borderColor: statusColor, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 12 }}>
            <Text style={{ fontFamily: "Inter_500Medium", fontSize: 12, color: statusColor }}>{statusLabel}</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={16} color={i < review.rating ? colors.yellow : colors.border} fill={i < review.rating ? colors.yellow : "transparent"} style={{ marginRight: 2 }} />
          ))}
          <Text style={{ fontFamily: "Inter_500Medium", fontSize: 12, color: colors.secondary, marginLeft: 6 }}>{review.rating.toFixed(1)}</Text>
        </View>
        <Text style={{ fontFamily: "Inter_400Regular", fontSize: 14, color: colors.primary, lineHeight: 20 }}>{review.comment}</Text>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 12 }}>
          <Text style={{ fontFamily: "Inter_400Regular", fontSize: 12, color: colors.secondary }}>{review.date}   {review.location}</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ flexDirection: "row", alignItems: "center", marginRight: 12 }}>
              <ThumbsUp size={16} color={colors.accent} />
              <Text style={{ fontFamily: "Inter_500Medium", fontSize: 12, color: colors.accent, marginLeft: 6 }}>{review.helpful}</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <ThumbsDown size={16} color={colors.secondary} />
              <Text style={{ fontFamily: "Inter_500Medium", fontSize: 12, color: colors.secondary, marginLeft: 6 }}>{review.notHelpful}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style={isDark ? "light" : "dark"} />
      {/* Header */}
      <View style={{ backgroundColor: colors.card, paddingTop: insets.top + 16, paddingBottom: 16, paddingHorizontal: 24, borderBottomWidth: 1, borderBottomColor: colors.border }}>
        <Text style={{ fontFamily: "Inter_700Bold", fontSize: 24, color: colors.primary, marginBottom: 4 }}>Deneyim Yorumları</Text>
        <Text style={{ fontFamily: "Inter_400Regular", fontSize: 14, color: colors.secondary }}>Topluluktan gelen güvenlik yorumları</Text>
      </View>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: insets.bottom + 100 }} showsVerticalScrollIndicator={false}>
        {/* Stats */}
        <View style={{ paddingHorizontal: 24, paddingTop: 24 }}>
          <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 16, color: colors.primary, marginBottom: 16 }}>Topluluk istatistikleri</Text>
          <View style={{ flexDirection: "row", marginBottom: 24, marginHorizontal: -6 }}>
            <StatCard icon={MessageSquare} label="Tümü" value="1,247" color={colors.accent} />
            <StatCard icon={Shield} label="Güvenli Profil" value="892" color="#3B82F6" />
            <StatCard icon={AlertTriangle} label="Uyarı" value="155" color={colors.warning} />
          </View>
        </View>
        {/* Filter title */}
        <View style={{ paddingHorizontal: 24, marginBottom: 16, flexDirection: "row", alignItems: "center" }}>
          <Filter size={20} color={colors.secondary} />
          <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 16, color: colors.primary, marginLeft: 8 }}>Filtrele</Text>
        </View>
        {/* Reviews list */}
        <View style={{ paddingHorizontal: 24 }}>
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
            <TrendingUp size={20} color={colors.secondary} />
            <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 16, color: colors.primary, marginLeft: 8 }}>Son Yorumlar</Text>
          </View>
          {reviews.map((r, i) => (
            <ReviewCard review={r} key={i} />
          ))}
          <TouchableOpacity style={{ backgroundColor: colors.card, borderRadius: 16, padding: 20, alignItems: "center", marginTop: 12, borderWidth: 1, borderColor: colors.border, borderStyle: "dashed" }} activeOpacity={0.8}>
            <Text style={{ fontFamily: "Inter_500Medium", fontSize: 14, color: colors.accent }}>Daha Fazla Yorum Göster</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}