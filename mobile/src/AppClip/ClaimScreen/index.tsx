import { useCallback, useEffect, useState } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import WelcomeText from './WelcomeText';
import Button from '@/components/Button';
import TextInput from '@/components/TextInput';
import { embeddedWallet, useSmartWallet } from '@thirdweb-dev/react-native';
import Config from 'react-native-config';

function ClaimScreen() {
  const [isClaiming, setIsClaiming] = useState(false);
  const [email, setEmail] = useState('');

  const { connect: connectSmartWallet } = useSmartWallet(embeddedWallet({
    auth: {
      options: ["apple"],
      redirectUrl: "claimd://",
    }
  }), {
    factoryAddress: Config.SMART_WALLET_FACTORY_ADDRESS,
    gasless: true,
  })

  const claim = useCallback(async () => {
    setIsClaiming(true);

    await signInWithApple()
  }, []);

  const signInWithApple = async () => {
    try {
      await connectSmartWallet({
        connectPersonalWallet: async (w) => {
          const authResult = await w.authenticate({ strategy: "apple", redirectUrl: "claimd://" });
          await w.connect({ authResult });
        }
      })
    } catch (e) {
      if (e instanceof Error) {
        if (e.message.includes("Sign in cancelled")) {
          return
        } else {
          console.error(e);
        }
      } else {
        console.error("failed to sign in", e);
      }
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {isClaiming && <Text>Claiming...</Text>}
      {!isClaiming && <WelcomeText />}

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