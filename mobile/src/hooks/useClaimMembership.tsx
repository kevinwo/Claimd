import { useSDK } from '@thirdweb-dev/react-native'
import Config from 'react-native-config'

const useClaimMembership = () => {
  const sdk = useSDK()

  const claim = async (): Promise<any> => {
    const contract = await sdk.getContract(Config.DROP_CONTRACT_ADDRESS)
    const tokenId = 0
    const quantity = 1

    const tx = await contract.erc1155.claim(tokenId, quantity)

    return tx.receipt
  }

  return { claim }
}

export default useClaimMembership
