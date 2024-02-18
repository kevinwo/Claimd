import { useCallback, useEffect, useState } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import WelcomeText from './WelcomeText';
import Button from '@/components/Button';
import { embeddedWallet, useConnectionStatus, useLogin, useSmartWallet, useUser } from '@thirdweb-dev/react-native';
import Config from 'react-native-config';
import SpinningCard from './SpinningCard';
import useClaimMembership from '@/hooks/useClaimMembership';
import ClaimedText from './ClaimedText';
import WalletManager from 'react-native-wallet-manager';

enum State {
  Pending,
  Claiming,
  Claimed
}

const addToAppleWallet = async () => {
  try {
    const result = await WalletManager.addPassFromUrl(
      // 'http://localhost:3001/api/getPass'
      'http://localhost:3001/claimd.pkpass'
    );
    console.log(result);
  } catch (e) {
    console.log(e);
  }
}

function ClaimScreen() {
  const connectionStatus = useConnectionStatus()
  const { login } = useLogin()
  const { isLoggedIn } = useUser()
  const { claim } = useClaimMembership()

  const [state, setState] = useState<State>(State.Pending);

  useEffect(() => {
    console.log("Claiming status:", state, connectionStatus, isLoggedIn)
    if (state == State.Claiming && isLoggedIn) {
      console.log("Claiming...")

      const performClaim = async () => {
        try {
          const receipt = await claim()
          console.log("Claimed", receipt)
          setState(State.Claimed)
        } catch (e) {
          console.error("Failed to claim", e)
        }
      }

      performClaim()
    }
  }, [isLoggedIn, state])

  useEffect(() => {
    if (state == State.Claiming && connectionStatus === "connected" && !isLoggedIn) {
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
  }, [connectionStatus, state])

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
    setState(State.Claiming)
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
      {state == State.Claiming && <SpinningCard />}
      {state == State.Pending && <WelcomeText />}

      {state !== State.Claimed && (
        <View style={{ width: '90%' }}>
          <Button
            title={state == State.Claiming ? "Claiming..." : "Claim It"}
            onPress={prepareToClaim}
            indeterminateProgress={state == State.Claiming}
          />
        </View>
      )}

      {state == State.Claimed && <>
        <ClaimedText />

        <View style={{ width: '90%' }}>
          <Button
            title="Add to Apple Wallet"
            onPress={addToAppleWallet}
          />

          <Button
            title="Download our full app and explore more perks"
            onPress={() => {
              console.log("Download app from App Store")
            }}
            type='secondary'
          />
        </View>
      </>}
    </SafeAreaView>
  );
}

export default ClaimScreen;