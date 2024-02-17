import "@thirdweb-dev/react-native-compat";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { isClip } from "react-native-app-clip";
import MainApp from "@/MainApp";
import AppClip from "@/AppClip";

export default function App() {
  if (isClip()) {
    return <AppClip />;
  } else {
    return <MainApp />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
