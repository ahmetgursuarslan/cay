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
  Search,
  User,
  Phone,
  Mail,
  Instagram,
  Clock,
  AlertCircle,
  ChevronRight,
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
import KeyboardAvoidingAnimatedView from "@/components/KeyboardAvoidingAnimatedView";

export default function SearchScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [showHeaderBorder, setShowHeaderBorder] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSearchType, setActiveSearchType] = useState("name");

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
  };

  const handleScroll = (event) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    setShowHeaderBorder(scrollY > 0);
  };

  const SearchTypeButton = ({ type, icon: IconComponent, label, isActive, onPress }) => (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: isActive ? colors.accent : colors.card,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 12,
        marginRight: 12,
        borderWidth: 1,
        borderColor: isActive ? colors.accent : colors.border,
      }}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <IconComponent
        size={18}
        color={isActive ? "white" : colors.primary}
      />
      <Text
        style={{
          fontFamily: "Inter_500Medium",
          fontSize: 14,
          color: isActive ? "white" : colors.primary,
          marginLeft: 8,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  const RecentSearchItem = ({ name, type, date, risk }) => (
    <TouchableOpacity
      style={{
        backgroundColor: colors.card,
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
      activeOpacity={0.9}
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
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 2 }}>
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 12,
              color: colors.secondary,
              marginRight: 12,
            }}
          >
            {type}
          </Text>
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 12,
              color: colors.secondary,
            }}
          >
            {date}
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 4 }}>
          <View
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: risk === "low" ? colors.accent : risk === "medium" ? colors.warning : colors.danger,
              marginRight: 6,
            }}
          />
          <Text
            style={{
              fontFamily: "Inter_500Medium",
              fontSize: 12,
              color: risk === "low" ? colors.accent : risk === "medium" ? colors.warning : colors.danger,
            }}
          >
            {risk === "low" ? "Düşük Risk" : risk === "medium" ? "Orta Risk" : "Yüksek Risk"}
          </Text>
        </View>
      </View>
      <ChevronRight size={20} color={colors.secondary} />
    </TouchableOpacity>
  );

  const recentSearches = [
    { name: "Ahmet Yılmaz", type: "İsim Arama", date: "2 saat önce", risk: "low" },
    { name: "+90 555 123 45 67", type: "Telefon Arama", date: "1 gün önce", risk: "medium" },
    { name: "mehmet_istanbul", type: "Instagram", date: "3 gün önce", risk: "low" },
  ];

  return (
    <KeyboardAvoidingAnimatedView style={{ flex: 1 }} behavior="padding">
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
          <Text
            style={{
              fontFamily: "Inter_700Bold",
              fontSize: 24,
              color: colors.primary,
              marginBottom: 8,
            }}
          >
            Araştırma Merkezi
          </Text>
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 14,
              color: colors.secondary,
            }}
          >
            Tanıştığın kişileri güvenli şekilde araştır
          </Text>
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          {/* Search Types */}
          <View style={{ paddingHorizontal: 24, paddingTop: 24 }}>
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 16,
                color: colors.primary,
                marginBottom: 16,
              }}
            >
              Arama Türü Seç
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ marginBottom: 24 }}
            >
              <SearchTypeButton
                type="name"
                icon={User}
                label="İsim"
                isActive={activeSearchType === "name"}
                onPress={() => setActiveSearchType("name")}
              />
              <SearchTypeButton
                type="phone"
                icon={Phone}
                label="Telefon"
                isActive={activeSearchType === "phone"}
                onPress={() => setActiveSearchType("phone")}
              />
              <SearchTypeButton
                type="email"
                icon={Mail}
                label="Email"
                isActive={activeSearchType === "email"}
                onPress={() => setActiveSearchType("email")}
              />
              <SearchTypeButton
                type="social"
                icon={Instagram}
                label="Sosyal Medya"
                isActive={activeSearchType === "social"}
                onPress={() => setActiveSearchType("social")}
              />
            </ScrollView>

            {/* Search Input */}
            <View
              style={{
                backgroundColor: colors.card,
                borderRadius: 16,
                paddingHorizontal: 20,
                paddingVertical: 16,
                marginBottom: 24,
                shadowColor: isDark ? "#000" : "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: isDark ? 0.5 : 0.1,
                shadowRadius: 8,
                elevation: 2,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
                <Search size={20} color={colors.accent} />
                <Text
                  style={{
                    fontFamily: "Inter_600SemiBold",
                    fontSize: 16,
                    color: colors.primary,
                    marginLeft: 12,
                  }}
                >
                  {activeSearchType === "name" && "İsim ile Ara"}
                  {activeSearchType === "phone" && "Telefon ile Ara"}
                  {activeSearchType === "email" && "Email ile Ara"}
                  {activeSearchType === "social" && "Sosyal Medya ile Ara"}
                </Text>
              </View>
              
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TextInput
                  style={{
                    flex: 1,
                    fontFamily: "Inter_400Regular",
                    fontSize: 16,
                    color: colors.primary,
                    paddingVertical: 8,
                  }}
                  placeholder={
                    activeSearchType === "name" ? "Örn: Ahmet Yılmaz" :
                    activeSearchType === "phone" ? "Örn: +90 555 123 45 67" :
                    activeSearchType === "email" ? "Örn: ahmet@example.com" :
                    "Örn: @ahmet_istanbul"
                  }
                  placeholderTextColor={colors.secondary}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  returnKeyType="search"
                />
                {searchQuery.length > 0 && (
                  <TouchableOpacity
                    onPress={() => setSearchQuery("")}
                    style={{ padding: 4 }}
                  >
                    <X size={18} color={colors.secondary} />
                  </TouchableOpacity>
                )}
              </View>

              <TouchableOpacity
                style={{
                  backgroundColor: colors.accent,
                  borderRadius: 12,
                  paddingVertical: 14,
                  alignItems: "center",
                  marginTop: 16,
                }}
                disabled={searchQuery.length === 0}
                activeOpacity={0.8}
              >
                <Text
                  style={{
                    fontFamily: "Inter_600SemiBold",
                    fontSize: 16,
                    color: "white",
                  }}
                >
                  Araştırmaya Başla
                </Text>
              </TouchableOpacity>
            </View>

            {/* Warning */}
            <View
              style={{
                backgroundColor: "#FFF7ED",
                borderRadius: 12,
                padding: 16,
                flexDirection: "row",
                marginBottom: 32,
                borderLeftWidth: 4,
                borderLeftColor: colors.warning,
              }}
            >
              <AlertCircle size={20} color={colors.warning} style={{ marginRight: 12, marginTop: 2 }} />
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontFamily: "Inter_600SemiBold",
                    fontSize: 14,
                    color: "#92400E",
                    marginBottom: 4,
                  }}
                >
                  Önemli Uyarı
                </Text>
                <Text
                  style={{
                    fontFamily: "Inter_400Regular",
                    fontSize: 12,
                    color: "#92400E",
                    lineHeight: 18,
                  }}
                >
                  Bu araç sadece güvenlik amacıyla kullanılmalıdır. Başkalarının özel hayatını ihlal etmek yasaktır.
                </Text>
              </View>
            </View>
          </View>

          {/* Recent Searches */}
          <View style={{ paddingHorizontal: 24 }}>
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}>
              <Clock size={20} color={colors.secondary} />
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 16,
                  color: colors.primary,
                  marginLeft: 8,
                }}
              >
                Son Aramalar
              </Text>
            </View>

            {recentSearches.map((search, index) => (
              <RecentSearchItem
                key={index}
                name={search.name}
                type={search.type}
                date={search.date}
                risk={search.risk}
              />
            ))}

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
                  color: colors.secondary,
                }}
              >
                Tüm Geçmişi Görüntüle
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingAnimatedView>
  );
}