import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import { auth } from "../config/firebase";
import { styled } from "nativewind";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledSafeAreaView = styled(SafeAreaView);
const StyledScrollView = styled(ScrollView);
const StyledImage = styled(Image);

const HomeScreen = ({ navigation }) => {
  const signOut = async () => {
    try {
      await auth.signOut();
      navigation.replace("Onboarding");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const navigateToSection = (sectionName) => {
    console.log(`Navigating to ${sectionName}`);
    // navigation.navigate(sectionName);
  };

  const navigateToAppDetail = (offerId) => {
    navigation.navigate("AppOfferDetail", { offerId });
  };

  return (
    <StyledSafeAreaView className="flex-1 bg-white">
      <StyledScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <StyledView className="flex-row justify-between items-center px-4 py-3">
          <StyledView>
            <StyledText className="text-xl font-bold text-text">
              Hello, User
            </StyledText>
            <StyledText className="text-gray-500">Welcome to Frizza</StyledText>
          </StyledView>
          <StyledView className="flex-row items-center">
            <StyledView className="bg-primary rounded-full p-2 mr-3">
              <StyledText className="text-white font-bold">500</StyledText>
            </StyledView>
            <StyledTouchableOpacity className="w-10 h-10 bg-gray-200 rounded-full items-center justify-center">
              <StyledText className="font-bold">👤</StyledText>
            </StyledTouchableOpacity>
          </StyledView>
        </StyledView>

        {/* Balance Card */}
        <StyledView className="mx-4 mt-4 bg-primary p-4 rounded-lg">
          <StyledText className="text-white text-lg">Total Balance</StyledText>
          <StyledText className="text-white text-3xl font-bold mt-1">
            ₹0.00
          </StyledText>
          <StyledTouchableOpacity className="bg-white py-2 px-4 rounded-full self-start mt-3">
            <StyledText className="text-primary font-bold">Withdraw</StyledText>
          </StyledTouchableOpacity>
        </StyledView>

        {/* Task Categories */}
        <StyledView className="mt-6 px-4">
          <StyledText className="text-xl font-bold mb-4">Earn Money</StyledText>

          <StyledView className="flex-row flex-wrap justify-between">
            {/* App Install Category */}
            <StyledTouchableOpacity
              className="w-[48%] bg-gray-100 rounded-lg p-4 mb-4"
              onPress={() => navigateToSection("AppInstalls")}
            >
              <StyledView className="w-12 h-12 bg-orange-100 rounded-full items-center justify-center mb-2">
                <StyledText className="text-2xl">📱</StyledText>
              </StyledView>
              <StyledText className="font-bold text-lg">
                Install Apps
              </StyledText>
              <StyledText className="text-gray-500 text-sm mt-1">
                Earn up to ₹100 per app
              </StyledText>
            </StyledTouchableOpacity>

            {/* Refer & Earn Category */}
            <StyledTouchableOpacity
              className="w-[48%] bg-gray-100 rounded-lg p-4 mb-4"
              onPress={() => navigateToSection("Referrals")}
            >
              <StyledView className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center mb-2">
                <StyledText className="text-2xl">👥</StyledText>
              </StyledView>
              <StyledText className="font-bold text-lg">
                Refer & Earn
              </StyledText>
              <StyledText className="text-gray-500 text-sm mt-1">
                ₹50 per referral
              </StyledText>
            </StyledTouchableOpacity>

            {/* Surveys Category */}
            <StyledTouchableOpacity
              className="w-[48%] bg-gray-100 rounded-lg p-4 mb-4"
              onPress={() => navigateToSection("Surveys")}
            >
              <StyledView className="w-12 h-12 bg-green-100 rounded-full items-center justify-center mb-2">
                <StyledText className="text-2xl">📝</StyledText>
              </StyledView>
              <StyledText className="font-bold text-lg">Surveys</StyledText>
              <StyledText className="text-gray-500 text-sm mt-1">
                Share your opinions
              </StyledText>
            </StyledTouchableOpacity>

            {/* Watch Videos Category */}
            <StyledTouchableOpacity
              className="w-[48%] bg-gray-100 rounded-lg p-4 mb-4"
              onPress={() => navigateToSection("Videos")}
            >
              <StyledView className="w-12 h-12 bg-purple-100 rounded-full items-center justify-center mb-2">
                <StyledText className="text-2xl">🎬</StyledText>
              </StyledView>
              <StyledText className="font-bold text-lg">
                Watch Videos
              </StyledText>
              <StyledText className="text-gray-500 text-sm mt-1">
                Quick & easy coins
              </StyledText>
            </StyledTouchableOpacity>
          </StyledView>
        </StyledView>

        {/* Featured App Installs */}
        <StyledView className="mt-4 px-4 pb-10">
          <StyledView className="flex-row justify-between items-center mb-4">
            <StyledText className="text-xl font-bold">Featured Apps</StyledText>
            <StyledTouchableOpacity
              onPress={() => navigateToSection("AppInstalls")}
            >
              <StyledText className="text-primary font-bold">
                See All
              </StyledText>
            </StyledTouchableOpacity>
          </StyledView>

          <StyledView className="bg-gray-100 rounded-lg p-4 mb-4">
            <StyledView className="flex-row">
              <StyledView className="w-16 h-16 bg-gray-300 rounded-lg mr-3"></StyledView>
              <StyledView className="flex-1">
                <StyledText className="font-bold text-lg">App Name</StyledText>
                <StyledText className="text-gray-500 text-sm mb-2">
                  Game • 10MB
                </StyledText>
                <StyledView className="flex-row items-center">
                  <StyledText className="text-primary font-bold mr-2">
                    +₹50
                  </StyledText>
                  <StyledText className="text-gray-500 text-xs">
                    Install & Open
                  </StyledText>
                </StyledView>
              </StyledView>
              <StyledTouchableOpacity
                className="bg-primary py-2 px-4 rounded-full self-center"
                onPress={() => navigateToAppDetail("offer1")}
              >
                <StyledText className="text-white font-bold">
                  Install
                </StyledText>
              </StyledTouchableOpacity>
            </StyledView>
          </StyledView>

          <StyledView className="bg-gray-100 rounded-lg p-4">
            <StyledView className="flex-row">
              <StyledView className="w-16 h-16 bg-gray-300 rounded-lg mr-3"></StyledView>
              <StyledView className="flex-1">
                <StyledText className="font-bold text-lg">App Name</StyledText>
                <StyledText className="text-gray-500 text-sm mb-2">
                  Shopping • 25MB
                </StyledText>
                <StyledView className="flex-row items-center">
                  <StyledText className="text-primary font-bold mr-2">
                    +₹75
                  </StyledText>
                  <StyledText className="text-gray-500 text-xs">
                    Install & Sign up
                  </StyledText>
                </StyledView>
              </StyledView>
              <StyledTouchableOpacity
                className="bg-primary py-2 px-4 rounded-full self-center"
                onPress={() => navigateToAppDetail("offer2")}
              >
                <StyledText className="text-white font-bold">
                  Install
                </StyledText>
              </StyledTouchableOpacity>
            </StyledView>
          </StyledView>
        </StyledView>
      </StyledScrollView>
    </StyledSafeAreaView>
  );
};

export default HomeScreen;
