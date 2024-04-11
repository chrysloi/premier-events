/* eslint-disable react-native/no-inline-styles */
import {
  ActivityIndicator,
  Alert,
  BackHandler,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import { buttonStyle, mainContainer, titleText } from "../assets/styles";
import DetailCard from "../components/detailCard";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera/next";
import apis from "../store/apis";
import { UnknownAction } from "@reduxjs/toolkit";
import { RootState } from "../store/types";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { SvgXml } from "react-native-svg";
import { back } from "../assets/icons/back";
import { StatusBar } from "expo-status-bar";
import { router, useNavigation } from "expo-router";
import { BarCodeScanningResult } from "expo-camera";

const Scanner: React.FC<any> = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [scanning, setScanning] = useState<boolean>(true);
  const [permission, requestPermission] = useCameraPermissions();
  const modalizeRef = useRef<Modalize>(null);
  const { height } = useWindowDimensions();
  const focused = useIsFocused();

  const { data, loading, error } = useSelector(
    (state: RootState) => state.scan
  );

  const onCodeScanned = useCallback(
    ({ data }: BarCodeScanningResult) => {
      if (focused && scanning && data) {
        dispatch(apis.scan(data) as unknown as UnknownAction);
        setScanning(false);
      }
    },
    [dispatch, scanning]
  );

  useEffect(() => {
    let timeout: any;
    if (
      data &&
      data[0] &&
      data[0].status &&
      data[0].status.length > 0 &&
      !loading
    ) {
      modalizeRef.current?.open();
    }

    if (error || (data && data[0] && data[0].message)) {
      Alert.alert("", data[0].message, [
        {
          text: "Ok.",
          style: "cancel",
          onPress: () => {
            dispatch(apis.resetAll());
            setScanning(!scanning);
          },
        },
      ]);
    }
    return () => clearTimeout(timeout);
  }, [data, dispatch, error, loading, scanning]);

  useEffect(() => {
    navigation.setOptions({ statusBarHidden: true });
    if (!permission) {
      (async () => {
        await requestPermission();
      })();
    }
  }, [permission, navigation]);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => {
      if (!scanning) {
        setScanning(true);
        modalizeRef.current?.close();
        return true;
      }
      navigation.goBack();
      return true;
    });
  }, [BackHandler, navigation, scanning]);

  if (permission && !permission.granted) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 5,
        }}
      >
        <Text style={[titleText, { color: "#1C1C25" }]}>
          You have to grant camera permissions to continue.
        </Text>
        <TouchableOpacity
          style={[buttonStyle, { width: "100%", marginVertical: 25 }]}
          activeOpacity={0.8}
          onPress={async () => await requestPermission()}
        >
          <Text style={{ color: "#fff", fontSize: 14 }}>Grant permissions</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[mainContainer]}>
      <StatusBar hidden />
      <CameraView
        style={{ flex: 1, height }}
        facing="back"
        barcodeScannerSettings={{ barcodeTypes: ["qr", "ean13"] }}
        onBarcodeScanned={onCodeScanned}
      >
        <TouchableOpacity
          style={{ paddingHorizontal: 10, paddingVertical: 10 }}
          onPress={() => router.back()}
        >
          <SvgXml xml={back} />
        </TouchableOpacity>
      </CameraView>
      {loading && (
        <View
          style={{
            flex: 1,
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            // height,
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size={50} />
        </View>
      )}
      <Portal>
        <Modalize
          ref={modalizeRef}
          modalHeight={350}
          modalStyle={{ flex: 1 }}
          withHandle={false}
          overlayStyle={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
          onClose={() => {
            modalizeRef.current?.close;
            setScanning(true);
            dispatch(apis.resetAll());
          }}
          children={
            <View style={{ padding: 24, height: 350 }}>
              {data &&
                data.length > 0 &&
                data.map((item, idx) => (
                  <View key={idx}>
                    <DetailCard title={"Status"} value={item.status} />
                    <DetailCard title={"att_id"} value={`${item.att_id}`} />
                    <DetailCard title={"RID"} value={`${item.rid}`} />
                    <DetailCard
                      title={"Names"}
                      value={`${item.fname} ${item.lname}`}
                    />
                    <DetailCard title={"Email"} value={item.email} />
                    <DetailCard title={"City"} value={item.city} />
                    <DetailCard title={"Phone number"} value={item.phone} />
                  </View>
                ))}
            </View>
          }
        />
      </Portal>
    </View>
  );
};

export default Scanner;
