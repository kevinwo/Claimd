import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ClaimScreen from './ClaimScreen';

const Stack = createNativeStackNavigator();

export default function ClaimNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Claim"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="Claim"
        component={ClaimScreen}
        // options={{ navigationBarHidden: true }}
      />
    </Stack.Navigator>
  );
}