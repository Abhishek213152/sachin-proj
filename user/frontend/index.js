import { registerRootComponent } from "expo";
import { AppRegistry } from "react-native";
import App from "./App";

// Register the app both with Expo's system and with AppRegistry to be safe
AppRegistry.registerComponent("main", () => App);
registerRootComponent(App);

// Export the App component directly as a fallback entry point
export default App;
