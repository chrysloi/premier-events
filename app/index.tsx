/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  useWindowDimensions,
  Alert,
  // ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  body,
  header,
  mainContainer,
  titleText,
  textStyle,
  input,
  buttonStyle,
  inputWithPass,
  inputContainerWithPass,
} from "../assets/styles";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import apis from "../store/apis";
import { UnknownAction } from "@reduxjs/toolkit";
import { RootState } from "../store/types";
//   import Toast from 'react-native-toast-message';
//   import {useCameraPermission} from 'react-native-vision-camera';
import { SvgXml } from "react-native-svg";
import { eye } from "../assets/icons/eye";
import { eyeOff } from "../assets/icons/eye-off";
import { loginIllustration } from "../assets/loginIllustration";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";

const Login: React.FC<any> = () => {
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const [showpass, setShowPass] = useState(false);
  const [isLoading, setLoading] = useState(false);
  // const {hasPermission, requestPermission} = useCameraPermission();
  const { height } = useWindowDimensions();

  const { loading, error, authenticated } = useSelector(
    (state: RootState) => state.login
  );

  // useEffect(() => {
  //   if (hasPermission === false) {
  //     (async () => {
  //       await requestPermission();
  //     })();
  //   }
  // }, [hasPermission, requestPermission]);

  useEffect(() => {
    if (authenticated) {
      dispatch(apis.resetAll());
      setLoading(false);
      router.push("/home");
    }

    if (error) {
      setLoading(false);
      Alert.alert("", "Wrong crendentials", [
        {
          text: "Ok.",
          style: "cancel",
          onPress: () => {
            dispatch(apis.resetAll());
          },
        },
      ]);
    }
  }, [authenticated, dispatch, error]);

  return (
    <View style={[mainContainer, { paddingTop: insets.top }]}>
      <KeyboardAwareScrollView style={{ flex: 1 }}>
        <View style={[header, { height: height * 0.35 }]}>
          <SvgXml xml={loginIllustration} style={{ marginBottom: 20 }} />
          <Text style={titleText}>Premier Events!</Text>
          <Text style={textStyle}>Please Login.</Text>
        </View>
        <Formik
          initialValues={{ username: "", password: "" }}
          onSubmit={(values) => {
            setLoading(true);
            dispatch(apis.login(values) as unknown as UnknownAction);
          }}
        >
          {({ handleChange, values, handleSubmit }) => (
            <View style={body}>
              <View>
                <View
                  style={{
                    marginBottom: 12,
                    backgroundColor: "#252531",
                    padding: 18,
                    // paddingVertical: 10,
                    borderRadius: 10,
                  }}
                >
                  <Text style={textStyle}>Username</Text>
                  <View style={{}}>
                    <TextInput
                      value={values.username}
                      placeholder="Username"
                      placeholderTextColor="#5F5F6B"
                      textContentType="username"
                      autoCapitalize="none"
                      onChangeText={handleChange("username")}
                      style={[
                        input,
                        { color: "#F5F5F5", textAlignVertical: "center" },
                      ]}
                    />
                  </View>
                </View>
                <View
                  style={{
                    marginBottom: 12,
                    backgroundColor: "#252531",
                    padding: 18,
                    // paddingVertical: 10,
                    borderRadius: 10,
                  }}
                >
                  <Text style={textStyle}>Password</Text>
                  <View style={inputContainerWithPass}>
                    <TextInput
                      value={values.password}
                      placeholder="******"
                      placeholderTextColor="#5F5F6B"
                      textContentType="password"
                      autoCapitalize="none"
                      secureTextEntry={!showpass}
                      onChangeText={handleChange("password")}
                      style={[
                        inputWithPass,
                        { color: "#F5F5F5", textAlignVertical: "center" },
                      ]}
                    />
                    <TouchableOpacity onPress={() => setShowPass(!showpass)}>
                      {showpass ? (
                        <SvgXml xml={eye} />
                      ) : (
                        <SvgXml xml={eyeOff} />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View>
                <TouchableOpacity
                  style={
                    loading || isLoading
                      ? { ...buttonStyle, opacity: 0.25 }
                      : buttonStyle
                  }
                  activeOpacity={0.8}
                  onPress={() => handleSubmit()}
                >
                  {loading || isLoading ? (
                    <ActivityIndicator color={"#1C1C25"} />
                  ) : (
                    <Text style={{ color: "#1C1C25", fontSize: 14 }}>
                      Login
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default Login;
