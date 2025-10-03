import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
  TextInput,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  ArrowLeft,
  Search,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Shield,
  MessageSquare,
  User,
  Settings,
  Mail,
} from "lucide-react-native";
import { useRouter } from "expo-router";
// Fonts are loaded at root; do not block render here

export default function HelpScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedIndex, setExpandedIndex] = useState(null);

  // no per-screen font gating

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

  const faqCategories = [
    {
      title: "Genel Sorular",
      icon: HelpCircle,
      color: colors.accent,
      questions: [
        {
          question: "Çay Güvenlik nedir?",
          answer:
            "Çay Güvenlik, flört ve tanışma uygulamalarında karşılaştığınız kişileri araştırmanıza, yorumları görmenize ve güvenli buluşmalar organize etmenize yardımcı olan bir güvenlik platformudur.",
        },
        {
          question: "Uygulama nasıl çalışır?",
          answer:
            "Uygulamaya kişinin adını, telefon numarasını veya sosyal medya hesabını girerek arama yapabilirsiniz. Sistemimiz veritabanında bu kişi hakkında yapılmış yorumları, güvenlik değerlendirmelerini ve genel bilgileri size sunar.",
        },
        {
          question: "Ücretsiz mi?",
          answer:
            "Temel özellikler tamamen ücretsizdir. Premium üyelikle daha detaylı raporlar, sınırsız arama ve öncelikli destek gibi ek özelliklere erişebilirsiniz.",
        },
      ],
    },
    {
      title: "Arama ve Yorumlar",
      icon: Search,
      color: colors.accent,
      questions: [
        {
          question: "Nasıl kişi araması yapabilirim?",
          answer:
            "Ana ekranda veya arama sekmesinde kişinin adı, telefon numarası, e-posta adresi veya sosyal medya kullanıcı adını girerek arama yapabilirsiniz. Sistem tüm kayıtlarda eşleşme arayacaktır.",
        },
        {
          question: "Yorum nasıl eklerim?",
          answer:
            "Yorumlar sekmesinden 'Yeni Yorum' butonuna tıklayarak yorum ekleyebilirsiniz. Yorumunuzda kişinin bilgilerini, güvenlik seviyesini ve detaylı açıklama eklemeniz gerekmektedir.",
        },
        {
          question: "Anonim yorum yapabilir miyim?",
          answer:
            "Evet, yorum eklerken 'Anonim Yorum' seçeneğini işaretleyerek kimliğinizi gizli tutabilirsiniz. Yorumunuz sisteme kaydedilecek ancak isminiz diğer kullanıcılara gösterilmeyecektir.",
        },
        {
          question: "Yanlış bilgi içeren yorumları nasıl şikayet edebilirim?",
          answer:
            "Her yorumun altında bulunan 'Şikayet Et' butonuna tıklayarak yanlış veya yanıltıcı yorumları bildirebilirsiniz. Ekibimiz 24 saat içinde inceleyecektir.",
        },
      ],
    },
    {
      title: "Gizlilik ve Güvenlik",
      icon: Shield,
      color: colors.accent,
      questions: [
        {
          question: "Verilerim güvende mi?",
          answer:
            "Tüm verileriniz şifrelenmiş olarak saklanır ve üçüncü şahıslarla paylaşılmaz. Gizlilik politikamızda detaylı bilgi bulabilirsiniz.",
        },
        {
          question: "Kimlik doğrulama nasıl yapılır?",
          answer:
            "Profil ayarlarından telefon numaranızı veya e-posta adresinizi doğrulayabilirsiniz. Doğrulanmış hesaplar daha güvenilir kabul edilir ve yorumları daha fazla öne çıkar.",
        },
        {
          question: "Profilim başkaları tarafından görülebilir mi?",
          answer:
            "Gizlilik ayarlarınıza göre profilinizin görünürlüğünü kontrol edebilirsiniz. İsterseniz tamamen anonim kalabilir veya doğrulanmış kullanıcı olarak görünebilirsiniz.",
        },
      ],
    },
    {
      title: "Hesap Yönetimi",
      icon: User,
      color: colors.accent,
      questions: [
        {
          question: "Hesabımı nasıl silebilirim?",
          answer:
            "Ayarlar > Hesap Yönetimi > Hesabı Sil menüsünden hesabınızı kalıcı olarak silebilirsiniz. Bu işlem geri alınamaz ve tüm verileriniz silinir.",
        },
        {
          question: "Şifremi unuttum, ne yapmalıyım?",
          answer:
            "Giriş ekranında 'Şifremi Unuttum' linkine tıklayın. Kayıtlı e-posta adresinize şifre sıfırlama linki gönderilecektir.",
        },
        {
          question: "E-posta adresimi nasıl değiştirebilirim?",
          answer:
            "Ayarlar > Hesap Bilgileri bölümünden e-posta adresinizi güncelleyebilirsiniz. Yeni e-posta adresinizi doğrulamanız gerekecektir.",
        },
      ],
    },
  ];

  const QuickHelpCard = ({ icon: IconComponent, title, onPress, color }) => (
    <TouchableOpacity
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
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View
        style={{
          width: 56,
          height: 56,
          backgroundColor: `${color}20`,
          borderRadius: 28,
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 12,
        }}
      >
        <IconComponent size={28} color={color} />
      </View>
      <Text
        style={{
          fontFamily: "Inter_500Medium",
          fontSize: 13,
          color: colors.primary,
          textAlign: "center",
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );

  const FAQItem = ({ question, answer, index }) => {
    const isExpanded = expandedIndex === index;

    return (
      <TouchableOpacity
        style={{
          backgroundColor: colors.card,
          borderRadius: 12,
          padding: 16,
          marginBottom: 12,
          borderWidth: 1,
          borderColor: isExpanded ? colors.accent : colors.border,
        }}
        onPress={() => setExpandedIndex(isExpanded ? null : index)}
        activeOpacity={0.8}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 15,
              color: colors.primary,
              flex: 1,
              marginRight: 12,
            }}
          >
            {question}
          </Text>
          {isExpanded ? (
            <ChevronUp size={20} color={colors.accent} />
          ) : (
            <ChevronDown size={20} color={colors.secondary} />
          )}
        </View>
        {isExpanded && (
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 14,
              color: colors.secondary,
              lineHeight: 20,
              marginTop: 12,
            }}
          >
            {answer}
          </Text>
        )}
      </TouchableOpacity>
    );
  };

  const CategorySection = ({ category, startIndex }) => {
    const Icon = category.icon;
    return (
      <View style={{ marginBottom: 32 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <View
            style={{
              width: 40,
              height: 40,
              backgroundColor: `${category.color}20`,
              borderRadius: 20,
              alignItems: "center",
              justifyContent: "center",
              marginRight: 12,
            }}
          >
            <Icon size={20} color={category.color} />
          </View>
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              fontSize: 18,
              color: colors.primary,
            }}
          >
            {category.title}
          </Text>
        </View>
        {category.questions.map((faq, index) => (
          <FAQItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            index={startIndex + index}
          />
        ))}
      </View>
    );
  };

  const filteredCategories = faqCategories
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((category) => category.questions.length > 0);

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
            marginBottom: 16,
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
            Yardım ve SSS
          </Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Search Bar */}
        <View
          style={{
            backgroundColor: colors.background,
            borderRadius: 12,
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 16,
            paddingVertical: 12,
          }}
        >
          <Search size={20} color={colors.secondary} />
          <TextInput
            style={{
              flex: 1,
              fontFamily: "Inter_400Regular",
              fontSize: 15,
              color: colors.primary,
              marginLeft: 12,
            }}
            placeholder="Soru ara..."
            placeholderTextColor={colors.secondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 24 }}
      >
        {/* Quick Help */}
        {!searchQuery && (
          <View style={{ marginBottom: 32 }}>
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 16,
                color: colors.primary,
                marginBottom: 16,
              }}
            >
              Hızlı Yardım
            </Text>
            <View style={{ flexDirection: "row", marginHorizontal: -6 }}>
              <QuickHelpCard
                icon={MessageSquare}
                title="Canlı Destek"
                onPress={() => router.push("/contact")}
                color={colors.accent}
              />
              <QuickHelpCard
                icon={Mail}
                title="E-posta Gönder"
                onPress={() => router.push("/contact")}
                color={colors.accent}
              />
            </View>
          </View>
        )}

        {/* FAQ Categories */}
        {filteredCategories.length > 0 ? (
          <>
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 16,
                color: colors.primary,
                marginBottom: 16,
              }}
            >
              Sık Sorulan Sorular
            </Text>
            {filteredCategories.map((category, catIndex) => {
              const startIndex = filteredCategories
                .slice(0, catIndex)
                .reduce((acc, cat) => acc + cat.questions.length, 0);
              return (
                <CategorySection
                  key={catIndex}
                  category={category}
                  startIndex={startIndex}
                />
              );
            })}
          </>
        ) : (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: 60,
            }}
          >
            <HelpCircle size={64} color={colors.border} />
            <Text
              style={{
                fontFamily: "Inter_500Medium",
                fontSize: 16,
                color: colors.secondary,
                marginTop: 16,
                textAlign: "center",
              }}
            >
              Aradığınız soruyu bulamadık
            </Text>
            <TouchableOpacity
              onPress={() => router.push("/contact")}
              style={{
                marginTop: 16,
                backgroundColor: colors.accent,
                paddingHorizontal: 24,
                paddingVertical: 12,
                borderRadius: 12,
              }}
              activeOpacity={0.8}
            >
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 14,
                  color: "white",
                }}
              >
                Bize Ulaşın
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Contact Banner */}
        <View
          style={{
            backgroundColor: colors.accentLight,
            borderRadius: 16,
            padding: 20,
            marginTop: 24,
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
            Daha fazla yardıma mı ihtiyacınız var?
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
            Destek ekibimiz size yardımcı olmak için burada. 7/24 hizmet
            veriyoruz.
          </Text>
          <TouchableOpacity
            onPress={() => router.push("/contact")}
            style={{
              backgroundColor: colors.accent,
              paddingHorizontal: 20,
              paddingVertical: 12,
              borderRadius: 12,
              alignSelf: "flex-start",
            }}
            activeOpacity={0.8}
          >
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
      </ScrollView>
    </View>
  );
}
