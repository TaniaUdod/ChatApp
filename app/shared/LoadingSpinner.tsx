import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

const LoadingSpinner: React.FC = () => (
  <View style={styles.container} testID="loading-spinner">
    <ActivityIndicator size="large" color="#0000ff" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LoadingSpinner;
