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
  User,
  Star,
  ThumbsUp,
  ThumbsDown,
  Flag,
  Share2,
  Calendar,
  MapPin,
  Shield,
  MessageCircle,
  Send,
} from "lucide-react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
// Use plain layout to avoid keyboard/animation deadlocks

export default function ReviewDetailScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const params = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [commentText, setCommentText] = useState("");
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

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

  // Mock data
  const reviewData = {
    id: params.id || "1",
    authorName: "AyÅŸe K.",
    targetName: "Mehmet YÄ±lmaz",
    rating: 5,
    date: "15 AralÄ±k 2024",
    location: "Ä°stanbul",
    meetingType: "Kahve BuluÅŸmasÄ±",
    status: "safe",
    text: "Mehmet ile tanÄ±ÅŸtÄ±ÄŸÄ±mda kendimi Ã§ok gÃ¼vende hissettim. SÃ¶yledikleri ile yaptÄ±klarÄ± birebir Ã¶rtÃ¼ÅŸtÃ¼. Ã‡ok nazik ve saygÄ±lÄ± bir insan. Herkese Ã¶neririm. GÃ¼venli bir buluÅŸma oldu.",
    helpfulCount: 24,
    notHelpfulCount: 2,
    isVerified: true,
    comments: [
      {
        id: 1,
        author: "Zeynep M.",
        text: "Ben de benzer bir deneyim yaÅŸadÄ±m, kesinlikle gÃ¼venilir.",
        date: "16 AralÄ±k 2024",
      },
      {
        id: 2,
        author: "Can Y.",
        text: "TeÅŸekkÃ¼rler bilgi iÃ§in.",
        date: "17 AralÄ±k 2024",
      },
    ],
  };

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
        return "GÃ¼venli";
      case "warning":
        return "Dikkatli Ol";
      case "danger":
        return "Tehlikeli";
      default:
        return "Bilinmiyor";
    }
  };

  const renderStars = (rating) => {
    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {Array.from({ length: 5 }, (_, index) => (
          <Star
            key={index}
            size={20}
            color={index < rating ? colors.yellow : colors.border}
            fill={index < rating ? colors.yellow : "transparent"}
            style={{ marginRight: 4 }}
          />
        ))}
      </View>
    );
  };

  const handleLike = () => {
    if (disliked) setDisliked(false);
    setLiked(!liked);
  };

  const handleDislike = () => {
    if (liked) setLiked(false);
    setDisliked(!disliked);
  };

  const CommentItem = ({ comment }) => (
    <View
      style={{
        backgroundColor: colors.background,
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 8,
        }}
      >
        <Text
          style={{
            fontFamily: "Inter_600SemiBold",
            fontSize: 14,
            color: colors.primary,
          }}
        >
          {comment.author}
        </Text>
        <Text
          style={{
            fontFamily: "Inter_400Regular",
            fontSize: 12,
            color: colors.secondary,
          }}
        >
          {comment.date}
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
        {comment.text}
      </Text>
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
              Yorum DetayÄ±
            </Text>
            <TouchableOpacity
              onPress={() => {}}
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
              <Share2 size={20} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120 }}
        >
          {/* Review Card */}
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
              {/* Author & Target */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 20,
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontFamily: "Inter_400Regular",
                      fontSize: 12,
                      color: colors.secondary,
                      marginBottom: 4,
                    }}
                  >
                    Yorumu Yapan
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Inter_600SemiBold",
                      fontSize: 16,
                      color: colors.primary,
                    }}
                  >
                    {reviewData.authorName}
                  </Text>
                </View>
                {reviewData.isVerified && (
                  <View
                    style={{
                      backgroundColor: colors.accentLight,
                      paddingHorizontal: 12,
                      paddingVertical: 6,
                      borderRadius: 12,
                      flexDirection: "row",
                      alignItems: "center",
                      height: 32,
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
                      DoÄŸrulandÄ±
                    </Text>
                  </View>
                )}
              </View>

              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: "/person-detail",
                    params: { name: reviewData.targetName },
                  })
                }
                style={{
                  backgroundColor: colors.background,
                  borderRadius: 12,
                  padding: 16,
                  marginBottom: 20,
                }}
                activeOpacity={0.8}
              >
                <Text
                  style={{
                    fontFamily: "Inter_400Regular",
                    fontSize: 12,
                    color: colors.secondary,
                    marginBottom: 4,
                  }}
                >
                  HakkÄ±nda
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Inter_600SemiBold",
                      fontSize: 18,
                      color: colors.primary,
                    }}
                  >
                    {reviewData.targetName}
                  </Text>
                  <View
                    style={{
                      backgroundColor: `${getStatusColor(reviewData.status)}20`,
                      paddingHorizontal: 12,
                      paddingVertical: 6,
                      borderRadius: 12,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Inter_600SemiBold",
                        fontSize: 12,
                        color: getStatusColor(reviewData.status),
                      }}
                    >
                      {getStatusText(reviewData.status)}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>

              {/* Rating & Date */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 20,
                }}
              >
                {renderStars(reviewData.rating)}
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Calendar size={14} color={colors.secondary} style={{ marginRight: 6 }} />
                  <Text
                    style={{
                      fontFamily: "Inter_400Regular",
                      fontSize: 12,
                      color: colors.secondary,
                    }}
                  >
                    {reviewData.date}
                  </Text>
                </View>
              </View>

              {/* Meeting Info */}
              <View
                style={{
                  flexDirection: "row",
                  marginBottom: 20,
                  gap: 12,
                }}
              >
                <View
                  style={{
                    flex: 1,
                    backgroundColor: colors.background,
                    borderRadius: 12,
                    padding: 12,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <MapPin size={16} color={colors.accent} style={{ marginRight: 8 }} />
                  <Text
                    style={{
                      fontFamily: "Inter_500Medium",
                      fontSize: 12,
                      color: colors.primary,
                    }}
                  >
                    {reviewData.location}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: colors.background,
                    borderRadius: 12,
                    padding: 12,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <MessageCircle size={16} color={colors.accent} style={{ marginRight: 8 }} />
                  <Text
                    style={{
                      fontFamily: "Inter_500Medium",
                      fontSize: 12,
                      color: colors.primary,
                    }}
                  >
                    {reviewData.meetingType}
                  </Text>
                </View>
              </View>

              {/* Review Text */}
              <Text
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 15,
                  color: colors.primary,
                  lineHeight: 24,
                  marginBottom: 20,
                }}
              >
                {reviewData.text}
              </Text>

              {/* Helpful Actions */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingTop: 20,
                  borderTopWidth: 1,
                  borderTopColor: colors.border,
                }}
              >
                <Text
                  style={{
                    fontFamily: "Inter_500Medium",
                    fontSize: 14,
                    color: colors.secondary,
                  }}
                >
                  Bu yorum faydalÄ± mÄ±?
                </Text>
                <View style={{ flexDirection: "row", gap: 12 }}>
                  <TouchableOpacity
                    onPress={handleLike}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      backgroundColor: liked ? colors.accentLight : colors.background,
                      paddingHorizontal: 12,
                      paddingVertical: 8,
                      borderRadius: 12,
                    }}
                    activeOpacity={0.8}
                  >
                    <ThumbsUp
                      size={16}
                      color={liked ? colors.accent : colors.secondary}
                      fill={liked ? colors.accent : "transparent"}
                    />
                    <Text
                      style={{
                        fontFamily: "Inter_600SemiBold",
                        fontSize: 12,
                        color: liked ? colors.accent : colors.secondary,
                        marginLeft: 6,
                      }}
                    >
                      {reviewData.helpfulCount + (liked ? 1 : 0)}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleDislike}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      backgroundColor: disliked ? colors.dangerLight : colors.background,
                      paddingHorizontal: 12,
                      paddingVertical: 8,
                      borderRadius: 12,
                    }}
                    activeOpacity={0.8}
                  >
                    <ThumbsDown
                      size={16}
                      color={disliked ? colors.danger : colors.secondary}
                      fill={disliked ? colors.danger : "transparent"}
                    />
                    <Text
                      style={{
                        fontFamily: "Inter_600SemiBold",
                        fontSize: 12,
                        color: disliked ? colors.danger : colors.secondary,
                        marginLeft: 6,
                      }}
                    >
                      {reviewData.notHelpfulCount + (disliked ? 1 : 0)}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          {/* Comments Section */}
          <View style={{ paddingHorizontal: 24, marginTop: 32 }}>
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 18,
                color: colors.primary,
                marginBottom: 16,
              }}
            >
              Yorumlar ({reviewData.comments.length})
            </Text>
            {reviewData.comments.map((comment) => (
              <CommentItem key={comment.id} comment={comment} />
            ))}
          </View>
        </ScrollView>

        {/* Bottom Input */}
        <View
          pointerEvents="box-none"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: colors.white,
            paddingTop: 12,
            paddingBottom: insets.bottom + 12,
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
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: colors.background,
                borderRadius: 24,
                paddingHorizontal: 16,
                paddingVertical: 12,
              }}
            >
              <TextInput
                style={{
                  flex: 1,
                  fontFamily: "Inter_400Regular",
                  fontSize: 14,
                  color: colors.primary,
                }}
                placeholder="Yorum ekle..."
                placeholderTextColor={colors.secondary}
                value={commentText}
                onChangeText={setCommentText}
                multiline
                maxLength={500}
              />
            </View>
            <TouchableOpacity
              style={{
                width: 48,
                height: 48,
                backgroundColor: commentText ? colors.accent : colors.border,
                borderRadius: 24,
                alignItems: "center",
                justifyContent: "center",
              }}
              disabled={!commentText}
              activeOpacity={0.8}
            >
              <Send size={20} color="white" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => router.push("/add-review")}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 12,
            }}
            activeOpacity={0.7}
          >
            <Flag size={14} color={colors.danger} style={{ marginRight: 6 }} />
            <Text
              style={{
                fontFamily: "Inter_500Medium",
                fontSize: 12,
                color: colors.danger,
              }}
            >
              Bu yorumu ÅŸikayet et
            </Text>
          </TouchableOpacity>
        </View>
    </View>
  );
}
