import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { styled } from "nativewind";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledSafeAreaView = styled(SafeAreaView);
const StyledImage = styled(Image);

const { width, height } = Dimensions.get("window");

// Fallback placeholder images
const placeholderImage = {
  uri: "https://via.placeholder.com/300x300?text=Frizza",
};

const slides = [
  {
    id: "1",
    title: "Earn Rewards",
    description:
      "Complete simple tasks and earn coins that can be redeemed for real money",
    image: placeholderImage,
  },
  {
    id: "2",
    title: "Install Apps & Earn",
    description: "Get paid for trying new apps. Install, use, and get rewarded",
    image: placeholderImage,
  },
  {
    id: "3",
    title: "Withdraw Anytime",
    description:
      "Cash out your earnings to your preferred payment method quickly",
    image: placeholderImage,
  },
];

const OnboardingScreen = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideListRef = useRef(null);

  const updateCurrentSlideIndex = (e) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentIndex(currentIndex);
  };

  const goToNextSlide = () => {
    const nextSlideIndex = currentIndex + 1;
    if (nextSlideIndex != slides.length) {
      const offset = nextSlideIndex * width;
      slideListRef?.current?.scrollToOffset({ offset });
      setCurrentIndex(nextSlideIndex);
    }
  };

  const skip = () => {
    const lastSlideIndex = slides.length - 1;
    const offset = lastSlideIndex * width;
    slideListRef?.current?.scrollToOffset({ offset });
    setCurrentIndex(lastSlideIndex);
  };

  const getStarted = () => {
    navigation.replace("PhoneAuth");
  };

  const Footer = () => {
    return (
      <StyledView className="absolute bottom-20 left-0 right-0 px-5">
        {/* Indicator container */}
        <StyledView className="flex-row justify-center mt-5">
          {slides.map((_, index) => (
            <StyledView
              key={index}
              className={`h-2.5 w-2.5 rounded-full mx-1 ${
                currentIndex === index ? "bg-primary w-5" : "bg-gray-300"
              }`}
            />
          ))}
        </StyledView>

        {/* Button container */}
        <StyledView className="mt-10">
          {currentIndex === slides.length - 1 ? (
            <StyledTouchableOpacity
              className="h-14 bg-primary rounded-full items-center justify-center"
              onPress={getStarted}
            >
              <StyledText className="text-white text-lg font-bold">
                Get Started
              </StyledText>
            </StyledTouchableOpacity>
          ) : (
            <StyledView className="flex-row">
              <StyledTouchableOpacity
                className="flex-1 h-14 border-primary border rounded-full items-center justify-center mr-2"
                onPress={skip}
              >
                <StyledText className="text-primary text-lg font-bold">
                  Skip
                </StyledText>
              </StyledTouchableOpacity>
              <StyledTouchableOpacity
                className="flex-1 h-14 bg-primary rounded-full items-center justify-center ml-2"
                onPress={goToNextSlide}
              >
                <StyledText className="text-white text-lg font-bold">
                  Next
                </StyledText>
              </StyledTouchableOpacity>
            </StyledView>
          )}
        </StyledView>
      </StyledView>
    );
  };

  return (
    <StyledSafeAreaView className="flex-1 bg-white">
      <FlatList
        ref={slideListRef}
        data={slides}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        renderItem={({ item }) => (
          <StyledView className="w-full h-full items-center" style={{ width }}>
            <StyledView className="mt-20">
              <StyledImage
                source={item.image}
                className="w-[300] h-[300] object-contain"
                resizeMode="contain"
                style={{ width: 300, height: 300 }}
              />
            </StyledView>
            <StyledView className="px-5 mt-10">
              <StyledText className="text-2xl font-bold text-center text-text">
                {item.title}
              </StyledText>
              <StyledText className="text-base text-center text-gray-500 mt-5">
                {item.description}
              </StyledText>
            </StyledView>
          </StyledView>
        )}
        keyExtractor={(item) => item.id}
      />
      <Footer />
    </StyledSafeAreaView>
  );
};

export default OnboardingScreen;
