import "@thirdweb-dev/react-native-compat";
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'

import { isClip } from "react-native-app-clip";
import MainApp from "@/MainApp";
import AppClip from "@/AppClip";

function Component() {
  if (isClip) {
    return <AppClip />;
  }
  return <MainApp />;
}

export default function App() {
  return (
    <NavigationContainer>
      <Component />
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
