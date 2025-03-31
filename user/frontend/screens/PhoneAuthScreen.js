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
import { auth } from "../config/firebase";
import { PhoneAuthProvider, signInWithCredential } from "firebase/auth";
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
  const [verificationId, setVerificationId] = useState("");
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

      // In a real implementation, use Firebase recaptcha verifier
      // const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container');

      // For demo purposes (in real app, use Firebase's signInWithPhoneNumber)
      // const confirmationResult = await signInWithPhoneNumber(auth, formattedNumber, recaptchaVerifier);
      // setVerificationId(confirmationResult.verificationId);

      // Since we can't actually test this in the demo, we'll just simulate it
      setVerificationId("dummy-verification-id");
      setIsCodeSent(true);
      startCountdown();

      Alert.alert("Success", `OTP sent to ${formattedNumber}`);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const verifyCode = async () => {
    if (verificationCode.length !== 6) {
      Alert.alert("Error", "Please enter a valid 6-digit code");
      return;
    }

    try {
      // In a real implementation:
      // const credential = PhoneAuthProvider.credential(verificationId, verificationCode);
      // await signInWithCredential(auth, credential);

      // For demo purposes, we'll just simulate successful verification
      navigation.replace("Home");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const resendCode = () => {
    if (!isResendDisabled) {
      sendVerificationCode();
    }
  };

  // Simple custom OTP input
  const OtpInput = () => {
    const inputRefs = Array(6)
      .fill(0)
      .map(() => React.createRef());

    const handleOtpChange = (text, index) => {
      // Update the verification code
      const newCode = verificationCode.split("");
      newCode[index] = text;
      setVerificationCode(newCode.join(""));

      // Move to next input if text was entered
      if (text.length === 1 && index < 5) {
        inputRefs[index + 1].current.focus();
      }
    };

    const handleKeyPress = (e, index) => {
      // Move to previous input on backspace
      if (
        e.nativeEvent.key === "Backspace" &&
        index > 0 &&
        !verificationCode[index]
      ) {
        inputRefs[index - 1].current.focus();
      }
    };

    return (
      <StyledView className="flex-row justify-between mb-6">
        {Array(6)
          .fill(0)
          .map((_, index) => (
            <StyledTextInput
              key={index}
              ref={inputRefs[index]}
              className="w-[45px] h-[50px] border border-gray-300 rounded-lg text-center text-lg bg-gray-100"
              keyboardType="number-pad"
              maxLength={1}
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
                <StyledText className="text-white text-lg font-bold">
                  Get OTP
                </StyledText>
              </StyledTouchableOpacity>
            </StyledView>
          ) : (
            <StyledView className="mt-10">
              <StyledText className="text-base font-medium mb-4">
                Enter 6-digit OTP
              </StyledText>

              <OtpInput />

              <StyledTouchableOpacity
                className="h-14 bg-primary rounded-full items-center justify-center mt-10"
                onPress={verifyCode}
              >
                <StyledText className="text-white text-lg font-bold">
                  Verify
                </StyledText>
              </StyledTouchableOpacity>

              <StyledView className="flex-row justify-center mt-5">
                <StyledText className="text-gray-500">
                  Didn't receive the OTP?{" "}
                </StyledText>
                <StyledTouchableOpacity
                  onPress={resendCode}
                  disabled={isResendDisabled}
                >
                  <StyledText
                    className={`font-bold ${
                      isResendDisabled ? "text-gray-400" : "text-primary"
                    }`}
                  >
                    {isResendDisabled ? `Resend in ${countdown}s` : "Resend"}
                  </StyledText>
                </StyledTouchableOpacity>
              </StyledView>
            </StyledView>
          )}
        </StyledView>
      </StyledKeyboardAvoidingView>
    </StyledSafeAreaView>
  );
};

export default PhoneAuthScreen;
