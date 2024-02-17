import * as React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import WelcomeText from './WelcomeText';
import Button from '@/components/Button';

function ClaimScreen() {
  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <WelcomeText />

      <View style={{ width: '90%' }}>
        <Button title="Claim It" onPress={() => {}} />
      </View>
    </SafeAreaView>
  );
}

export default ClaimScreen;