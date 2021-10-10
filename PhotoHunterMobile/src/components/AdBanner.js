import React from 'react'
import { AdMobBanner } from 'expo-ads-admob'
import { Platform } from 'react-native'

export default function AdBanner() {
  return Platform.select({
    ios: () => {
      return (
        <AdMobBanner
          bannerSize="largeBanner"
          adUnitID={'ca-app-pub-1201256601321447/3572724672'}
          servePersonalizedAds={false}
        />
      )
    },
    android: () => {
      return (
        <AdMobBanner
          bannerSize="largeBanner"
          adUnitID={'ca-app-pub-1201256601321447/9246927022'}
          servePersonalizedAds={false}
        />
      )
    },
    default: () => {
      return <></>
    },
  })()
}
