declare module 'react-native-config' {
  export interface NativeConfig {
    THIRDWEB_CLIENT_ID: string;
    THIRDWEB_AUTH_DOMAIN: string;
    THIRDWEB_AUTH_URL: string;
    SMART_WALLET_FACTORY_ADDRESS: string;
  }

  export const Config: NativeConfig
  export default Config
}