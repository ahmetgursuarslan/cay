import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  useColorScheme,
  Linking,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Send,
  Clock,
  Globe,
  Twitter,
  Instagram,
  Facebook,
} from "lucide-react-native";
import { useRouter } from "expo-router";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
// Use native KeyboardAvoidingView to avoid rare freezes seen with custom animated wrapper

export default function ContactScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

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
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "E-posta",
      value: "destek@cayguvenlik.com",
      action: () => Linking.openURL("mailto:destek@cayguvenlik.com"),
      color: colors.accent,
    },
    {
      icon: Phone,
      title: "Telefon",
      value: "+90 (212) 555 0000",
      action: () => Linking.openURL("tel:+902125550000"),
      color: colors.accent,
    },
    {
      icon: MapPin,
      title: "Adres",
      value: "İstanbul, Türkiye",
      action: null,
      color: colors.accent,
    },
    {
      icon: Clock,
      title: "Çalışma Saatleri",
      value: "Hafta İçi 09:00 - 18:00",
      action: null,
      color: colors.accent,
    },
  ];

  const socialMedia = [
    {
      icon: Twitter,
      name: "Twitter",
      handle: "@cayguvenlik",
      url: "https://twitter.com/cayguvenlik",
      color: "#1DA1F2",
    },
    {
      icon: Instagram,
      name: "Instagram",
      handle: "@cayguvenlik",
      url: "https://instagram.com/cayguvenlik",
      color: "#E4405F",
    },
    {
      icon: Facebook,
      name: "Facebook",
      handle: "cayguvenlik",
      url: "https://facebook.com/cayguvenlik",
      color: "#1877F2",
    },
  ];

  const isFormValid = () => {
    return (
      name.trim() &&
      email.trim() &&
      subject.trim() &&
      message.trim().length >= 10
    );
  };

  const handleSubmit = () => {
    if (isFormValid()) {
      // API call here
      router.back();
    }
  };

  const ContactMethodCard = ({ method }) => {
    const Icon = method.icon;
    return (
      <TouchableOpacity
        style={{
          backgroundColor: colors.card,
          borderRadius: 16,
          padding: 20,
          marginBottom: 12,
          borderWidth: 1,
          borderColor: colors.border,
        }}
        onPress={method.action}
        disabled={!method.action}
        activeOpacity={method.action ? 0.8 : 1}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              width: 48,
              height: 48,
              backgroundColor: `${method.color}20`,
              borderRadius: 24,
              alignItems: "center",
              justifyContent: "center",
              marginRight: 16,
            }}
          >
            <Icon size={24} color={method.color} />
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontFamily: "Inter_500Medium",
                fontSize: 14,
                color: colors.secondary,
                marginBottom: 4,
              }}
            >
              {method.title}
            </Text>
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 16,
                color: colors.primary,
              }}
            >
              {method.value}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const SocialMediaCard = ({ social }) => {
    const Icon = social.icon;
    return (
      <TouchableOpacity
        style={{
          backgroundColor: colors.card,
          borderRadius: 12,
          padding: 16,
          marginBottom: 12,
          flexDirection: "row",
          alignItems: "center",
          borderWidth: 1,
          borderColor: colors.border,
        }}
        onPress={() => Linking.openURL(social.url)}
        activeOpacity={0.8}
      >
        <View
          style={{
            width: 40,
            height: 40,
            backgroundColor: `${social.color}20`,
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "center",
            marginRight: 12,
          }}
        >
          <Icon size={20} color={social.color} />
        </View>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontFamily: "Inter_500Medium",
              fontSize: 14,
              color: colors.primary,
            }}
          >
            {social.name}
          </Text>
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 12,
              color: colors.secondary,
              marginTop: 2,
            }}
          >
            {social.handle}
          </Text>
        </View>
        <Globe size={16} color={colors.secondary} />
      </TouchableOpacity>
    );
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
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
              İletişim
            </Text>
            <View style={{ width: 40 }} />
          </View>
        </View>

        <ScrollView
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 24, paddingBottom: 100 }}
          keyboardShouldPersistTaps="always"
          keyboardDismissMode="on-drag"
        >
          {/* Contact Banner */}
          <View
            style={{
              backgroundColor: colors.accent,
              borderRadius: 20,
              padding: 24,
              marginBottom: 24,
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: 64,
                height: 64,
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                borderRadius: 32,
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 16,
              }}
            >
              <MessageCircle size={32} color="white" />
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
              Size Nasıl Yardımcı Olabiliriz?
            </Text>
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 14,
                color: "rgba(255, 255, 255, 0.9)",
                textAlign: "center",
                lineHeight: 20,
              }}
            >
              7/24 destek ekibimiz sizin için burada. Sorularınızı ve
              önerilerinizi bizimle paylaşın.
            </Text>
          </View>

          {/* Contact Methods */}
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
          {contactMethods.map((method, index) => (
            <ContactMethodCard key={index} method={method} />
          ))}

          {/* Contact Form */}
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 18,
              color: colors.primary,
              marginBottom: 16,
              marginTop: 24,
            }}
          >
            Mesaj Gönderin
          </Text>
          <View style={{ gap: 16 }}>
            <View
              style={{
                backgroundColor: colors.card,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: colors.border,
                padding: 16,
              }}
            >
              <Text
                style={{
                  fontFamily: "Inter_500Medium",
                  fontSize: 14,
                  color: colors.secondary,
                  marginBottom: 8,
                }}
              >
                İsim
              </Text>
              <TextInput
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 15,
                  color: colors.primary,
                }}
                placeholder="Adınız ve soyadınız"
                placeholderTextColor={colors.secondary}
                value={name}
                onChangeText={setName}
              />
            </View>

            <View
              style={{
                backgroundColor: colors.card,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: colors.border,
                padding: 16,
              }}
            >
              <Text
                style={{
                  fontFamily: "Inter_500Medium",
                  fontSize: 14,
                  color: colors.secondary,
                  marginBottom: 8,
                }}
              >
                E-posta
              </Text>
              <TextInput
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 15,
                  color: colors.primary,
                }}
                placeholder="ornek@email.com"
                placeholderTextColor={colors.secondary}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View
              style={{
                backgroundColor: colors.card,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: colors.border,
                padding: 16,
              }}
            >
              <Text
                style={{
                  fontFamily: "Inter_500Medium",
                  fontSize: 14,
                  color: colors.secondary,
                  marginBottom: 8,
                }}
              >
                Konu
              </Text>
              <TextInput
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 15,
                  color: colors.primary,
                }}
                placeholder="Mesajınızın konusu"
                placeholderTextColor={colors.secondary}
                value={subject}
                onChangeText={setSubject}
              />
            </View>

            <View
              style={{
                backgroundColor: colors.card,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: colors.border,
                padding: 16,
              }}
            >
              <Text
                style={{
                  fontFamily: "Inter_500Medium",
                  fontSize: 14,
                  color: colors.secondary,
                  marginBottom: 8,
                }}
              >
                Mesajınız
              </Text>
              <TextInput
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 15,
                  color: colors.primary,
                  minHeight: 120,
                  textAlignVertical: "top",
                }}
                placeholder="Mesajınızı buraya yazın..."
                placeholderTextColor={colors.secondary}
                value={message}
                onChangeText={setMessage}
                multiline
                maxLength={500}
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
                {message.length}/500
              </Text>
            </View>
          </View>

          {/* Social Media */}
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 18,
              color: colors.primary,
              marginBottom: 16,
              marginTop: 24,
            }}
          >
            Sosyal Medya
          </Text>
          {socialMedia.map((social, index) => (
            <SocialMediaCard key={index} social={social} />
          ))}

          {/* Info Banner */}
          <View
            style={{
              backgroundColor: colors.accentLight,
              borderRadius: 12,
              padding: 16,
              marginTop: 24,
              borderLeftWidth: 4,
              borderLeftColor: colors.accent,
            }}
          >
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 14,
                color: colors.primary,
                marginBottom: 4,
              }}
            >
              Hızlı Yanıt Garantisi
            </Text>
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 13,
                color: colors.secondary,
                lineHeight: 18,
              }}
            >
              Tüm mesajlarınıza 24 saat içinde yanıt vermeye çalışıyoruz.
            </Text>
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
              backgroundColor: isFormValid() ? colors.accent : colors.border,
              borderRadius: 12,
              padding: 16,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
            activeOpacity={0.8}
          >
            <Send size={20} color="white" style={{ marginRight: 8 }} />
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 16,
                color: "white",
              }}
            >
              Mesajı Gönder
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
