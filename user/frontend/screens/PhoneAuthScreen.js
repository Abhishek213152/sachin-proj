import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { styled } from "nativewind";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledSafeAreaView = styled(SafeAreaView);
const StyledKeyboardAvoidingView = styled(KeyboardAvoidingView);
const StyledImage = styled(Image);

// Fallback placeholder image
const placeholderImage = {
  uri: "https://via.placeholder.com/250x250?text=Phone+Verification",
};

const PhoneAuthScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(false);

  const formatPhoneNumber = (number) => {
    // Remove all non-numeric characters
    const cleaned = ("" + number).replace(/\D/g, "");

    // Ensure it starts with +91 for India (adjust based on your region)
    const formattedNumber = `+91${cleaned}`;

    return formattedNumber;
  };

  const startCountdown = () => {
    setIsResendDisabled(true);
    setCountdown(60);

    const timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 1) {
          clearInterval(timer);
          setIsResendDisabled(false);
          return 0;
        }
        return prevCountdown - 1;
      });
    }, 1000);
  };

  const sendVerificationCode = async () => {
    if (phoneNumber.length < 10) {
      Alert.alert("Error", "Please enter a valid phone number");
      return;
    }

    try {
      const formattedNumber = formatPhoneNumber(phoneNumber);

      // Simulate sending a verification code
      setIsCodeSent(true);
      startCountdown();

      Alert.alert("Success", `OTP sent to ${formattedNumber}`);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const resendVerificationCode = () => {
    if (isResendDisabled) return;

    sendVerificationCode();
  };

  const verifyCode = async () => {
    try {
      // For demo: Simple validation of format
      if (verificationCode.length !== 6) {
        Alert.alert("Error", "Please enter all 6 digits of the OTP");
        return;
      }

      // Hardcoded verification for testing - would be replaced with actual verification
      if (verificationCode === "123456") {
        // Navigate to main app
        navigation.replace("Home");
      } else {
        Alert.alert(
          "Error",
          "Invalid verification code. Try 123456 for testing."
        );
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const handleOtpChange = (text, index) => {
    if (text.length > 1) {
      text = text[0]; // Only take the first character if multiple are pasted
    }

    // Update the verification code
    const newCode = verificationCode.split("");
    newCode[index] = text;
    setVerificationCode(newCode.join(""));

    // Auto-focus next input if text was entered
    if (text && index < 5) {
      const nextInput = document.querySelector(`input[name=otp-${index + 1}]`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (
      e.nativeEvent.key === "Backspace" &&
      index > 0 &&
      !verificationCode[index]
    ) {
      // Focus previous input on backspace
      const prevInput = document.querySelector(`input[name=otp-${index - 1}]`);
      if (prevInput) prevInput.focus();
    }
  };

  const renderOtpInputs = () => {
    return (
      <StyledView className="flex-row justify-between mt-8">
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <StyledTextInput
            key={index}
            className="w-12 h-12 border border-gray-300 rounded-lg text-center text-xl"
            maxLength={1}
            keyboardType="number-pad"
            value={verificationCode[index] || ""}
            onChangeText={(text) => handleOtpChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
          />
        ))}
      </StyledView>
    );
  };

  return (
    <StyledSafeAreaView className="flex-1 bg-white">
      <StyledKeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <StyledView className="flex-1 px-5">
          <StyledView className="items-center mt-10">
            <StyledImage
              source={placeholderImage}
              className="w-[250] h-[250]"
              resizeMode="contain"
              style={{ width: 250, height: 250 }}
            />
          </StyledView>

          <StyledView className="mt-10">
            <StyledText className="text-2xl font-bold text-center text-text">
              {isCodeSent ? "Verify OTP" : "Phone Verification"}
            </StyledText>
            <StyledText className="text-center text-gray-500 mt-4">
              {isCodeSent
                ? `We've sent a verification code to ${formatPhoneNumber(
                    phoneNumber
                  )}`
                : "We will send you a one-time password to verify your phone number"}
            </StyledText>
          </StyledView>

          {!isCodeSent ? (
            <StyledView className="mt-10">
              <StyledView className="flex-row items-center border-b border-gray-300 pb-2">
                <StyledText className="text-lg mr-2">+91</StyledText>
                <StyledTextInput
                  className="flex-1 text-lg"
                  placeholder="Enter your phone number"
                  keyboardType="phone-pad"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  maxLength={10}
                />
              </StyledView>

              <StyledTouchableOpacity
                className="h-14 bg-primary rounded-full items-center justify-center mt-10"
                onPress={sendVerificationCode}
              >
                <StyledText className="text-lg font-medium text-white">
                  Send Verification Code
                </StyledText>
              </StyledTouchableOpacity>
            </StyledView>
          ) : (
            <StyledView className="mt-10">
              {renderOtpInputs()}

              <StyledView className="flex-row justify-center mt-6">
                <StyledText className="text-gray-500">
                  Didn't receive code?{" "}
                </StyledText>
                <StyledTouchableOpacity
                  onPress={resendVerificationCode}
                  disabled={isResendDisabled}
                >
                  <StyledText
                    className={`font-medium ${
                      isResendDisabled ? "text-gray-400" : "text-primary"
                    }`}
                  >
                    {isResendDisabled
                      ? `Resend in ${countdown}s`
                      : "Resend Code"}
                  </StyledText>
                </StyledTouchableOpacity>
              </StyledView>

              <StyledTouchableOpacity
                className="h-14 bg-primary rounded-full items-center justify-center mt-10"
                onPress={verifyCode}
              >
                <StyledText className="text-lg font-medium text-white">
                  Verify
                </StyledText>
              </StyledTouchableOpacity>
            </StyledView>
          )}
        </StyledView>
      </StyledKeyboardAvoidingView>
    </StyledSafeAreaView>
  );
};

export default PhoneAuthScreen;
