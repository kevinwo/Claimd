import { ThirdwebAuth } from "@thirdweb-dev/auth/next"
import { PrivateKeyWallet } from "@thirdweb-dev/auth/evm"
import { User } from "@thirdweb-dev/auth"
// import { fetchOrCreateUser } from "./lib/users"

export const { ThirdwebAuthHandler, getUser } = ThirdwebAuth({
  domain: process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN as string,
  wallet: new PrivateKeyWallet(process.env.THIRDWEB_AUTH_PRIVATE_KEY || ""),
  callbacks: {
    // onUser: async (user: User, _) => {
    //   console.log("💥 onUser:", user)
    //   await fetchOrCreateUser(user.address)
    // },
  },
  authOptions: {
    validateNonce: async (nonce: string) => {
      // TODO: Implement nonce validation
      // // Check in database or storage if nonce exists
      // const nonceExists = await dbExample.nonceExists(nonce);
      // if (nonceExists) {
      //   throw new Error("Nonce has already been used!");
      // }

      // // Otherwise save nonce in database or storage for later validation
      // await dbExample.saveNonce(nonce);
    },
  }
})