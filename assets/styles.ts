import { TextStyle, ViewStyle } from "react-native";

export const input: ViewStyle = {
  minHeight: 50,
  //   padding: 12,
  //   borderRadius: 12,
  borderBottomWidth: 2,
  borderBottomColor: "#5F5F6B",
};

export const inputWithPass: ViewStyle = {
  ...input,
  padding: 0,
  flex: 1,
  borderBottomWidth: 0,
  paddingRight: 10,
};

export const inputContainerWithPass: ViewStyle = {
  ...input,
  height: 50,
  width: "100%",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
};

export const textStyle: TextStyle = {
  fontSize: 14,
  paddingStart: 6,
  paddingBottom: 10,
  color: "#F5F5F5",
};

export const mainContainer: ViewStyle = {
  flex: 1,
  backgroundColor: "#1C1C25",
};

export const header: ViewStyle = {
  flex: 0.4,
  justifyContent: "center",
  alignItems: "center",
};

export const titleText: TextStyle = {
  color: "#fff",
  fontWeight: "600",
  fontSize: 35,
};

export const body: ViewStyle = {
  flex: 0.7,
  bottom: 0,
  borderTopStartRadius: 25,
  borderTopEndRadius: 25,
  padding: 24,
  gap: 20,
};

export const button: ViewStyle = {
  backgroundColor: "#1C1C25",
  paddingHorizontal: 15,
  paddingVertical: 10,
};

export const buttonStyle: ViewStyle = {
  borderRadius: 12,
  width: "100%",
  alignItems: "center",
  padding: 12,
  marginBottom: 12,
  backgroundColor: "#F5F5F5",
};
