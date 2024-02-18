import { useCallback, useEffect, useState } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import WelcomeText from './WelcomeText';
import Button from '@/components/Button';
import TextInput from '@/components/TextInput';

function ClaimScreen() {
  const [isClaiming, setIsClaiming] = useState(false);
  const [email, setEmail] = useState('');

  const claim = useCallback(() => {
    setIsClaiming(true);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {isClaiming && <Text>Claiming...</Text>}
      {!isClaiming && <WelcomeText />}

      <View style={{ width: '90%', paddingBottom: 24 }}>
        <TextInput
          placeholder="Email"
          keyboardType="email-address"
          onChangeText={setEmail}
        />
      </View>

      <View style={{ width: '90%' }}>
        <Button
          title={isClaiming ? "Claiming..." : "Claim It"}
          onPress={claim}
          indeterminateProgress={isClaiming}
        />
      </View>
    </SafeAreaView>
  );
}

export default ClaimScreen;