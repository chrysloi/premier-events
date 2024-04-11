/* eslint-disable react-native/no-inline-styles */
import { BackHandler, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useRef } from "react";
import { clearStorage } from "../constants/asyncStorage";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import {
  buttonStyle,
  mainContainer,
  textStyle,
  titleText,
} from "../assets/styles";
import { SvgXml } from "react-native-svg";
import { codeScan } from "../assets/codeScan";
import { logout } from "../assets/icons/logout";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router, useNavigation } from "expo-router";

const Home: React.FC<any> = () => {
  const modalizeRef = useRef<Modalize>(null);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => {
      modalizeRef.current?.open();
      return true;
    });
  }, [BackHandler]);

  return (
    <View
      style={[
        mainContainer,
        { alignItems: "center", justifyContent: "space-evenly", padding: 24 },
      ]}
    >
      <TouchableOpacity
        style={{
          position: "absolute",
          right: insets.right + 30,
          top: insets.top + 24,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
        activeOpacity={0.8}
        onPress={async () => {
          await clearStorage();
          router.push("/");
        }}
      >
        <SvgXml xml={logout} />
      </TouchableOpacity>
      <Text style={titleText}>Scan your QR Code</Text>
      <SvgXml xml={codeScan} />
      <TouchableOpacity
        style={[buttonStyle, { width: "100%" }]}
        activeOpacity={0.8}
        onPress={() => {
          router.push("/scanner");
        }}
      >
        <Text style={{ color: "#1C1C25", fontSize: 14 }}>Scan QR Code</Text>
      </TouchableOpacity>
      <Portal>
        <Modalize
          ref={modalizeRef}
          modalHeight={200}
          modalStyle={{ flex: 1 }}
          overlayStyle={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
          onClose={() => {
            modalizeRef.current?.close;
          }}
          withHandle={false}
          children={
            <View style={{ padding: 24, height: 200 }}>
              <Text
                style={[
                  textStyle,
                  { color: "#1C1C25", fontWeight: "600", fontSize: 18 },
                ]}
              >
                You're about to logout?
              </Text>
              <Text style={[textStyle, { color: "#1C1C25", fontSize: 18 }]}>
                Are you sure you want to continue?
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginVertical: 15,
                }}
              >
                <TouchableOpacity
                  style={{
                    ...buttonStyle,
                    backgroundColor: "transparent",
                    borderWidth: 2,
                    width: "48%",
                  }}
                  activeOpacity={0.8}
                  onPress={() => modalizeRef.current?.close()}
                >
                  <Text style={{ color: "#1C1C25", fontSize: 14 }}>
                    Keep me in.
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    buttonStyle,
                    { width: "48%", backgroundColor: "#1C1C25" },
                  ]}
                  activeOpacity={0.8}
                  onPress={async () => {
                    await clearStorage();
                    modalizeRef.current?.close();
                  }}
                >
                  <Text style={{ color: "#fff", fontSize: 14 }}>Yes</Text>
                </TouchableOpacity>
              </View>
            </View>
          }
        />
      </Portal>
    </View>
  );
};

export default Home;
