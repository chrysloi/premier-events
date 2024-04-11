import { View, Text, LogBox } from "react-native";
import React, { useEffect } from "react";
import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "../store";
import { Host } from "react-native-portalize";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Camera } from "expo-camera";

LogBox.ignoreAllLogs();
const Layout = () => {
  const [permission, requestPermission] = Camera.useCameraPermissions();

  useEffect(() => {
    if (permission && !permission.granted) {
      (async () => {
        await requestPermission();
      })();
    }
  }, [permission]);

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <Host>
            <Stack
              screenOptions={{
                headerShown: false,
                statusBarColor: "#1C1C25",
              }}
            />
          </Host>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </Provider>
  );
};

export default Layout;
