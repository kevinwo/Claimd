import { useCallback, useEffect, useState } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import WelcomeText from './WelcomeText';
import Button from '@/components/Button';
import TextInput from '@/components/TextInput';
import { embeddedWallet, useConnectionStatus, useLogin, useSmartWallet, useUser } from '@thirdweb-dev/react-native';
import Config from 'react-native-config';
import SpinningCard from './SpinningCard';
import useClaimMembership from '@/hooks/useClaimMembership';

function ClaimScreen() {
  const connectionStatus = useConnectionStatus()
  const { login } = useLogin()
  const { isLoggedIn } = useUser()
  const { claim } = useClaimMembership()

  const [isClaiming, setIsClaiming] = useState(false);

  useEffect(() => {
    console.log("Claiming status:", isClaiming, connectionStatus, isLoggedIn)
    if (isClaiming && isLoggedIn) {
      console.log("Claiming...")

      const performClaim = async () => {
        try {
          const receipt = await claim()
          console.log("Claimed", receipt)
        } catch (e) {
          console.error("Failed to claim", e)
        }
      }

      performClaim()
    }
  }, [isLoggedIn, isClaiming])

  useEffect(() => {
    if (isClaiming && connectionStatus === "connected" && !isLoggedIn) {
      const performLogin = async () => {
        console.log("Logging in")
        try {
          await login()
        } catch (e) {
          console.error("Failed to login", e)
        }
      }

      setTimeout(() => {
        performLogin()
      }, 1000)
    }
  }, [connectionStatus, isClaiming])

  const { connect: connectSmartWallet } = useSmartWallet(embeddedWallet({
    auth: {
      options: ["apple"],
      redirectUrl: "claimd://",
    }
  }), {
    factoryAddress: Config.SMART_WALLET_FACTORY_ADDRESS,
    gasless: true,
  })

  const prepareToClaim = useCallback(async () => {
    setIsClaiming(true)
    console.log(connectionStatus)

    if (connectionStatus === "disconnected") {
      console.log("Connecting with Apple")
      await signInWithApple()
    } else {
      console.log("User is already connected")
    }
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
      {isClaiming && <SpinningCard />}
      {!isClaiming && <WelcomeText />}

      <View style={{ width: '90%' }}>
        <Button
          title={isClaiming ? "Claiming..." : "Claim It"}
          onPress={prepareToClaim}
          indeterminateProgress={isClaiming}
        />
      </View>
    </SafeAreaView>
  );
}

export default ClaimScreen;