![Claimd: Memberships for You](https://github.com/kevinwo/Claimd/blob/main/ClamdWordmarkLogo.jpg?raw=true)

- [What is Claimd?](#what-is-claimd)
- [Demo](#demo)
- [Goals](#goals)
- [How I Built This](#how-i-built-this)

# What is Claimd?

Claimd is a mobile-first membership claiming application built during the [February 2024 Thirdweb Consumer Crypto Hackathon](https://thirdweb.com/hackathon/consumer-crypto). It lets consumers simultaneously onboard to a business's mobile app using an App Clip and claim a membership after making a purchase, all in under 60 seconds.

# Demo

https://github.com/kevinwo/Claimd/assets/371957/6822be4a-3d70-49ac-ac1b-cb7020af438a

# Goals

I've been excited about possible uses for on-chain memberships in real life over the past year, and have been thinking about what to build around this to make creation and access easier for consumers, businesses, and their partners. As part of the hackathon, I decided to focus on better membership onboarding, and see if I could achieve the following with Thirdweb on iOS:

- [x] Provide a simple and familiar entry point to claim a membership after making a purchase with a shop
- [x] Let users both create an account with the business and claim an on-chain membership in one button click
- [x] Add their membership to their Apple Wallet

# How I Built This

## Membership Claim

- I knew I wanted this to be mobile-first, so I started with a new Expo-based React Native app, particularly since the [Thirdweb SDK](https://portal.thirdweb.com/react-native) is already React Native-friendly.
- Because I didn't want the user to have to think about creating an account, I leveraged [Thirdweb Auth](https://thirdweb.com/auth) and Sign in with Apple, making signing in a breeze, but also allowing for privacy if the user wants to hide their email address.
  - To support auth and look to the future of managing user data, I stood up a Next.js application to supplement the backend auth portion.
- I also didn't want the user to have to think about wallets, so I used [Thirdweb Embedded Wallets](https://thirdweb.com/embedded-wallets) to make it easy to tie the user's email to a unique wallet.
- Given each membership claim costs gas to claim, and therefore involves crypto, I used account abstraction via [Thirdweb Smart Wallet](https://thirdweb.com/account-abstraction) to handle gas on the user's behalf, and let them glide through claiming their membership.

## App Clip

- Typically an [App Clip](https://developer.apple.com/app-clips/) is built in native Swift using SwiftUI. Given my choice of React Native for the main app, and limited time constraints, I found a very nice library, [react-native-app-clip](https://github.com/bndkt/react-native-app-clip), from which let me load my React Native app code into an App Clip, while allowing conditional execution of code depending on whether I was in the main app or in the App Clip.
- To be able to trigger the App Clip from my device when on the frontend of my web app post-purchase, I [registered a local experience in iOS developer settings](https://developer.apple.com/documentation/app_clips/testing_the_launch_experience_of_your_app_clip#3671998). (I wanted to upgrade this to a trigger based on QR code, as a consumer might do in real life at a given store post-purchase, but ran out of time.)
- With the App Clip prompt appearing on frontend load, I then am able to let the user jump instantly into the claim experience.

## Apple Wallet Pass

- An [Apple Wallet Pass](https://developer.apple.com/documentation/walletpasses) can either be added from a static asset, or dynamically generated on the fly before being added.
- Using [passkit-generator](https://github.com/alexandercerutti/passkit-generator) on the backend, and following through the necessary [signing/certficate steps with Apple](https://developer.apple.com/documentation/walletpasses/building_a_pass#3732524), I am able to generate unique passes for each membership, letting consumers be easily identified for discounts, events, etc. with the business or partners.
- Using [react-native-wallet-manager](https://github.com/dev-family/react-native-wallet-manager) on the frontend, after fetching the dynamically generated pass data, I can open a modal that renders the pass and allows the user to add it to their Apple Wallet.
