import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { styled } from "nativewind";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const BackButton = ({ onPress, fallbackRoute = "Home" }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (onPress) {
      onPress();
      return;
    }

    // Check if we can go back
    const state = navigation.getState();
    if (state.index > 0) {
      // There's a screen to go back to
      navigation.goBack();
    } else {
      // No screen to go back to, navigate to fallback
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: fallbackRoute }],
        })
      );
    }
  };

  return (
    <StyledTouchableOpacity
      onPress={handlePress}
      className="w-8 h-8 items-center justify-center rounded-full bg-gray-100"
    >
      <StyledText className="text-xl">←</StyledText>
    </StyledTouchableOpacity>
  );
};

export default BackButton;
