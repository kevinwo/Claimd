import { ISecureStorage } from "@thirdweb-dev/react-core"
import * as Keychain from 'react-native-keychain'

const PREFIX = "__iykyk__"
const ACCESS_GROUP = "group.com.kevinwolkober.Claimd"

export class SecureStorage implements ISecureStorage {
  async getItem(key: string): Promise<string | null> {
    const credentials = await Keychain.getGenericPassword({
      service: `${PREFIX}_${key}`,
      accessGroup: ACCESS_GROUP,
    })
    return credentials ? credentials.password : null
  }

  async setItem(key: string, value: string): Promise<void> {
    await Keychain.setGenericPassword(key, value, {
      service: `${PREFIX}_${key}`,
      accessGroup: ACCESS_GROUP,
    })
  }

  async removeItem(key: string): Promise<void> {
    await Keychain.resetGenericPassword({
      service: `${PREFIX}_${key}`,
      accessGroup: ACCESS_GROUP,
    })
  }
}
