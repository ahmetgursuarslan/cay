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
  MessageSquare,
  Plus,
  Star,
  ThumbsUp,
  ThumbsDown,
  AlertTriangle,
  Filter,
  TrendingUp,
  Shield,
} from "lucide-react-native";
import { useRouter } from "expo-router";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";

export default function ReviewsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [showHeaderBorder, setShowHeaderBorder] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");

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
    warning: "#F59E0B",
    yellow: "#F59E0B",
  };

  const handleScroll = (event) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    setShowHeaderBorder(scrollY > 0);
  };

  const FilterButton = ({ filter, label, count, isActive, onPress }) => (
    <TouchableOpacity
      style={{
        backgroundColor: isActive ? colors.accent : colors.card,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 12,
        marginRight: 12,
        borderWidth: 1,
        borderColor: isActive ? colors.accent : colors.border,
        flexDirection: "row",
        alignItems: "center",
      }}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text
        style={{
          fontFamily: "Inter_500Medium",
          fontSize: 14,
          color: isActive ? "white" : colors.primary,
          marginRight: count ? 8 : 0,
        }}
      >
        {label}
      </Text>
      {count && (
        <View
          style={{
            backgroundColor: isActive ? "rgba(255,255,255,0.2)" : colors.border,
            paddingHorizontal: 8,
            paddingVertical: 2,
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 12,
              color: isActive ? "white" : colors.secondary,
            }}
          >
            {count}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );

  const ReviewCard = ({ review }) => {
    const getStatusColor = (status) => {
      switch (status) {
        case "safe":
          return colors.accent;
        case "warning":
          return colors.warning;
        case "danger":
          return colors.danger;
        default:
          return colors.secondary;
      }
    };

    const getStatusText = (status) => {
      switch (status) {
        case "safe":
          return "Güvenli";
        case "warning":
          return "Dikkatli Ol";
        case "danger":
          return "Tehlikeli";
        default:
          return "Bilinmiyor";
      }
    };

    const renderStars = (rating) => {
      return Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          size={16}
          color={index < rating ? colors.yellow : colors.border}
          fill={index < rating ? colors.yellow : "transparent"}
        />
      ));
    };

    return (
      <View
        style={{
          backgroundColor: colors.card,
          borderRadius: 16,
          padding: 20,
          marginBottom: 16,
          shadowColor: isDark ? "#000" : "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: isDark ? 0.5 : 0.1,
          shadowRadius: 8,
          elevation: 2,
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 16,
                color: colors.primary,
                marginBottom: 4,
              }}
            >
              {review.targetName}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
              {renderStars(review.rating)}
              <Text
                style={{
                  fontFamily: "Inter_500Medium",
                  fontSize: 14,
                  color: colors.secondary,
                  marginLeft: 8,
                }}
              >
                {review.rating}.0
              </Text>
            </View>
          </View>
          <View
            style={{
              backgroundColor: `${getStatusColor(review.status)}20`,
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: getStatusColor(review.status),
            }}
          >
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 12,
                color: getStatusColor(review.status),
              }}
            >
              {getStatusText(review.status)}
            </Text>
          </View>
        </View>

        <Text
          style={{
            fontFamily: "Inter_400Regular",
            fontSize: 14,
            color: colors.primary,
            lineHeight: 20,
            marginBottom: 16,
          }}
        >
          {review.comment}
        </Text>

        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 12,
                color: colors.secondary,
                marginRight: 16,
              }}
            >
              {review.date}
            </Text>
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 12,
                color: colors.secondary,
              }}
            >
              {review.location}
            </Text>
          </View>
          
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginRight: 16,
              }}
              activeOpacity={0.7}
            >
              <ThumbsUp size={16} color={colors.accent} />
              <Text
                style={{
                  fontFamily: "Inter_500Medium",
                  fontSize: 12,
                  color: colors.accent,
                  marginLeft: 4,
                }}
              >
                {review.helpful}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
              activeOpacity={0.7}
            >
              <ThumbsDown size={16} color={colors.secondary} />
              <Text
                style={{
                  fontFamily: "Inter_500Medium",
                  fontSize: 12,
                  color: colors.secondary,
                  marginLeft: 4,
                }}
              >
                {review.notHelpful}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const StatCard = ({ icon: IconComponent, label, value, color }) => (
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
          fontFamily: "Inter_700Bold",
          fontSize: 18,
          color: colors.primary,
          marginBottom: 4,
        }}
      >
        {value}
      </Text>
      <Text
        style={{
          fontFamily: "Inter_400Regular",
          fontSize: 12,
          color: colors.secondary,
          textAlign: "center",
        }}
      >
        {label}
      </Text>
    </View>
  );

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
      comment: "Çok centilmen ve saygılı biri. Buluşma güvenli bir kafede oldu ve hiç rahatsız hissetmedim.",
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
          elevation: 0,
          zIndex: 0,
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
              Deneyim Yorumları
            </Text>
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 14,
                color: colors.secondary,
              }}
            >
              Topluluktan gelen güvenlik yorumları
            </Text>
          </View>
          
          <TouchableOpacity
            style={{
              backgroundColor: colors.accent,
              width: 48,
              height: 48,
              borderRadius: 24,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => router.push("/add-review")}
            activeOpacity={0.8}
          >
            <Plus size={24} color="white" />
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
        {/* Stats Section */}
        <View style={{ paddingHorizontal: 24, paddingTop: 24 }}>
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 16,
              color: colors.primary,
              marginBottom: 16,
            }}
          >
            Topluluk İstatistikleri
          </Text>
          <View style={{ flexDirection: "row", marginBottom: 32, marginHorizontal: -6 }}>
            <StatCard
              icon={MessageSquare}
              label="Toplam Yorum"
              value="1.2K"
              color={colors.accent}
            />
            <StatCard
              icon={Shield}
              label="Güvenli Profil"
              value="892"
              color="#3B82F6"
            />
            <StatCard
              icon={AlertTriangle}
              label="Uyarı Verildi"
              value="155"
              color={colors.warning}
            />
          </View>
        </View>

        {/* Filters */}
        <View style={{ paddingHorizontal: 24, marginBottom: 24 }}>
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}>
            <Filter size={20} color={colors.secondary} />
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 16,
                color: colors.primary,
                marginLeft: 8,
              }}
            >
              Filtrele
            </Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            <FilterButton
              filter="all"
              label="Tümü"
              count="1.2K"
              isActive={activeFilter === "all"}
              onPress={() => setActiveFilter("all")}
            />
            <FilterButton
              filter="safe"
              label="Güvenli"
              count="892"
              isActive={activeFilter === "safe"}
              onPress={() => setActiveFilter("safe")}
            />
            <FilterButton
              filter="warning"
              label="Uyarı"
              count="200"
              isActive={activeFilter === "warning"}
              onPress={() => setActiveFilter("warning")}
            />
            <FilterButton
              filter="danger"
              label="Tehlike"
              count="155"
              isActive={activeFilter === "danger"}
              onPress={() => setActiveFilter("danger")}
            />
          </ScrollView>
        </View>

        {/* Reviews List */}
        <View style={{ paddingHorizontal: 24 }}>
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
            <TrendingUp size={20} color={colors.secondary} />
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 16,
                color: colors.primary,
                marginLeft: 8,
              }}
            >
              Son Yorumlar
            </Text>
          </View>

          {reviews.map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))}

          {/* Load More */}
          <TouchableOpacity
            style={{
              backgroundColor: colors.card,
              borderRadius: 16,
              padding: 20,
              alignItems: "center",
              marginTop: 12,
              borderWidth: 1,
              borderColor: colors.border,
              borderStyle: "dashed",
            }}
            activeOpacity={0.8}
          >
            <Text
              style={{
                fontFamily: "Inter_500Medium",
                fontSize: 14,
                color: colors.accent,
              }}
            >
              Daha Fazla Yorum Göster
            </Text>
          </TouchableOpacity>
        </View>

        {/* Add Review CTA */}
        <View style={{ paddingHorizontal: 24, paddingVertical: 32 }}>
          <View
            style={{
              backgroundColor: colors.accent,
              borderRadius: 20,
              padding: 24,
              alignItems: "center",
            }}
          >
            <MessageSquare size={32} color="white" style={{ marginBottom: 16 }} />
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 18,
                color: "white",
                textAlign: "center",
                marginBottom: 8,
              }}
            >
              Deneyimini Paylaş
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
              Tanıştığın kişi hakkındaki deneyimini paylaşarak diğer kadınları uyar
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: "white",
                paddingHorizontal: 24,
                paddingVertical: 12,
                borderRadius: 24,
              }}
              onPress={() => router.push("/add-review")}
              activeOpacity={0.9}
            >
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 16,
                  color: colors.accent,
                }}
              >
                Yorum Ekle
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}