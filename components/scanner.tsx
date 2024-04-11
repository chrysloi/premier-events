/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UnknownAction } from "@reduxjs/toolkit";
import {
  Text,
  useWindowDimensions,
  View,
  ActivityIndicator,
  Alert,
  BackHandler,
  TouchableOpacity,
} from "react-native";
// import {
//   Camera,
//   Code,
//   useCameraDevice,
//   useCameraPermission,
//   useCodeScanner,
// } from 'react-native-vision-camera';
// import apis from '../store/apis';
import { RootState } from "../store/types";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import DetailCard from "./detailCard";
import { buttonStyle, titleText } from "../assets/styles";

const QrCodeScanner: React.FC<any> = ({}) => {
  const dispatch = useDispatch();
  // const device = useCameraDevice('back');
  const [scanning, setScanning] = useState<boolean>(true);
  // const {hasPermission, requestPermission} = useCameraPermission();
  const modalizeRef = useRef<Modalize>(null);
  const { height } = useWindowDimensions();

  const { data, loading } = useSelector((state: RootState) => state.scan);

  // const onCodeScanned = useCallback(
  //   (codes: Code[]) => {
  //     if (scanning && codes[0].value) {
  //       dispatch(apis.scan(codes[0].value) as unknown as UnknownAction);
  //       setScanning(false);
  //     }
  //   },
  //   [dispatch, scanning],
  // );

  // const codeScanner = useCodeScanner({
  //   codeTypes: ['qr', 'ean-13'],
  //   onCodeScanned: onCodeScanned,
  // });

  // useEffect(() => {
  //   if (!loading && data && data.length > 0) {
  //     modalizeRef.current?.open();
  //   }
  // }, [data, loading]);

  // if (device == null) {
  //   Alert.alert(
  //     'Device unsupported',
  //     "There no camera detected you can't use this device",
  //     [
  //       {
  //         text: 'Close the app.',
  //         style: 'destructive',
  //         onPress: () => BackHandler.exitApp(),
  //       },
  //     ],
  //   );
  //   return;
  // }

  // if (!hasPermission) {
  //   return (
  //     <View
  //       style={{
  //         flex: 1,
  //         justifyContent: 'center',
  //         alignItems: 'center',
  //         paddingHorizontal: 5,
  //       }}>
  //       <Text style={[titleText, {color: '#1C1C25'}]}>
  //         You have to grant camera permissions to continue.
  //       </Text>
  //       <TouchableOpacity
  //         style={[buttonStyle, {width: '100%', marginVertical: 25}]}
  //         activeOpacity={0.8}
  //         onPress={async () => await requestPermission()}>
  //         <Text style={{color: '#fff', fontSize: 14}}>Grant permissions</Text>
  //       </TouchableOpacity>
  //     </View>
  //   );
  // }

  return (
    <View style={{ flex: 1 }}>
      {/* <Camera
        style={{flex: 1}}
        device={device}
        isActive={scanning}
        codeScanner={codeScanner}
        collapsable
      /> */}
      {/* {loading && (
        <View
          style={{
            flex: 1,
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            height,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            justifyContent: 'center',
          }}>
          <ActivityIndicator size={50} />
        </View>
      )} */}
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
          }}
          children={
            <View style={{ padding: 24, height: 350 }}>
              {data &&
                data.length > 0 &&
                data.map((item, idx) => {
                  console.info(item.status);
                  return (
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
                  );
                })}
            </View>
          }
        />
      </Portal>
    </View>
  );
};

export default React.memo(QrCodeScanner);
