import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Alert,
} from "react-native";
import { styled } from "nativewind";
import BackButton from "../components/BackButton";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledSafeAreaView = styled(SafeAreaView);
const StyledScrollView = styled(ScrollView);
const StyledImage = styled(Image);

const AppOfferDetailScreen = ({ route, navigation }) => {
  const { offerId } = route.params || { offerId: "offer1" };
  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you would fetch this from your API
    // For demo purposes, we'll use a mock offer
    const mockOffer = {
      id: offerId,
      title: "Game App",
      description: "Install and play to level 5 to earn coins",
      category: "game",
      coins: 100,
      imageUrl: "https://via.placeholder.com/100",
      appSize: "45MB",
      requirements: "Install and reach level 5",
      instructions: [
        "Click the Install button below",
        "Open the app after installation",
        "Create an account and complete tutorial",
        "Play until you reach level 5",
        "Return to Frizza to claim your reward",
      ],
      downloadUrl: "https://play.google.com/store",
      createdAt: new Date().toISOString(),
    };

    setOffer(mockOffer);
    setLoading(false);
  }, [offerId]);

  const handleInstall = () => {
    // In a real app, this would track the click and redirect to Play Store
    Alert.alert(
      "Tracking Installation",
      "In a real app, this would redirect you to the Play Store and track your installation."
    );
  };

  if (loading) {
    return (
      <StyledSafeAreaView className="flex-1 bg-white">
        <StyledView className="flex-1 justify-center items-center">
          <StyledText>Loading offer details...</StyledText>
        </StyledView>
      </StyledSafeAreaView>
    );
  }

  return (
    <StyledSafeAreaView className="flex-1 bg-white">
      {/* Custom Header with Back Button */}
      <StyledView className="flex-row items-center p-4 border-b border-gray-100">
        <BackButton fallbackRoute="Home" />
        <StyledText className="text-xl font-bold ml-4">
          Offer Details
        </StyledText>
      </StyledView>

      <StyledScrollView className="flex-1">
        {/* App Info */}
        <StyledView className="p-4">
          <StyledView className="flex-row">
            <StyledView className="w-20 h-20 bg-gray-300 rounded-lg mr-4">
              {offer.imageUrl && (
                <StyledImage
                  source={{ uri: offer.imageUrl }}
                  style={{ width: 80, height: 80, borderRadius: 8 }}
                />
              )}
            </StyledView>
            <StyledView className="flex-1">
              <StyledText className="text-2xl font-bold">
                {offer.title}
              </StyledText>
              <StyledText className="text-gray-500">
                {offer.category} • {offer.appSize}
              </StyledText>
              <StyledView className="flex-row items-center mt-2">
                <StyledText className="text-primary font-bold text-lg">
                  +₹{offer.coins}
                </StyledText>
              </StyledView>
            </StyledView>
          </StyledView>

          <StyledView className="mt-6">
            <StyledText className="text-lg font-bold">Description</StyledText>
            <StyledText className="text-gray-600 mt-2">
              {offer.description}
            </StyledText>
          </StyledView>

          <StyledView className="mt-6">
            <StyledText className="text-lg font-bold">Instructions</StyledText>
            {offer.instructions.map((instruction, index) => (
              <StyledView key={index} className="flex-row mt-2">
                <StyledText className="text-primary mr-2">
                  {index + 1}.
                </StyledText>
                <StyledText className="text-gray-600 flex-1">
                  {instruction}
                </StyledText>
              </StyledView>
            ))}
          </StyledView>
        </StyledView>
      </StyledScrollView>

      {/* Install Button */}
      <StyledView className="p-4 border-t border-gray-200">
        <StyledTouchableOpacity
          className="bg-primary rounded-full py-4 items-center"
          onPress={handleInstall}
        >
          <StyledText className="text-white font-bold text-lg">
            INSTALL & EARN
          </StyledText>
        </StyledTouchableOpacity>
      </StyledView>
    </StyledSafeAreaView>
  );
};

export default AppOfferDetailScreen;
