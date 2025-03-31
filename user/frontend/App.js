import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Import screens
import OnboardingScreen from "./screens/OnboardingScreen";
import PhoneAuthScreen from "./screens/PhoneAuthScreen";
import HomeScreen from "./screens/HomeScreen";
import AppOfferDetailScreen from "./screens/AppOfferDetailScreen";

// Import components
import BackButton from "./components/BackButton";

const Stack = createStackNavigator();

// Create separate navigators for authenticated and non-authenticated flows
const AuthStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="Onboarding" component={OnboardingScreen} />
    <Stack.Screen
      name="PhoneAuth"
      component={PhoneAuthScreen}
      options={{
        headerShown: true,
        headerTitle: "",
        headerTransparent: true,
        headerLeft: (props) => (
          <BackButton {...props} fallbackRoute="Onboarding" />
        ),
        headerLeftContainerStyle: {
          paddingLeft: 20,
        },
      }}
    />
  </Stack.Navigator>
);

const MainStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="AppOfferDetail" component={AppOfferDetailScreen} />
  </Stack.Navigator>
);

export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Set initializing to false after a short delay to simulate auth check
    const timer = setTimeout(() => {
      setInitializing(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (initializing) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <MainStack /> : <AuthStack />}
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
