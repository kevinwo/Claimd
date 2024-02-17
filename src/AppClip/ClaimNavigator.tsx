import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ClaimScreen from './ClaimScreen';

const Stack = createNativeStackNavigator();

export default function ClaimNavigator() {
  return (
    <Stack.Navigator initialRouteName="Claim">
      <Stack.Screen
        name="Claim"
        component={ClaimScreen}
      />
    </Stack.Navigator>
  );
}