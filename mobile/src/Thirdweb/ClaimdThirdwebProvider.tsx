import {
  ThirdwebProvider,
  coinbaseWallet,
  embeddedWallet,
  metamaskWallet,
  smartWallet,
} from '@thirdweb-dev/react-native'

import { BaseSepoliaTestnet, Sepolia } from '@thirdweb-dev/chains'
import { SecureStorage } from "@/utils/SecureStorage"
import Config from 'react-native-config'

interface Props {
  children: React.ReactNode
}

const ClaimdThirdwebProvider = ({ children }: Props) => {
  return (
    <ThirdwebProvider
      autoConnectTimeout={30000}
      supportedChains={[Sepolia, BaseSepoliaTestnet]}
      activeChain={Sepolia}
      clientId={Config.THIRDWEB_CLIENT_ID}
      supportedWallets={[
        smartWallet(embeddedWallet(), {
          factoryAddress: Config.SMART_WALLET_FACTORY_ADDRESS,
          gasless: true,
        }),
        metamaskWallet(),
        coinbaseWallet()
      ]}
      authConfig={{
        domain: Config.THIRDWEB_AUTH_DOMAIN,
        authUrl: Config.THIRDWEB_AUTH_URL,
        secureStorage: new SecureStorage()
      }}
    >
      {children}
    </ThirdwebProvider>
  )
}

export default ClaimdThirdwebProvider