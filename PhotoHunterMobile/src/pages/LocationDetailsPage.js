import React, {useEffect, useState} from 'react'
import {useLocation, useParams} from 'react-router-dom'
import axios from 'axios'
import {Image, Platform, ScrollView, Text, View} from 'react-native'
import Styles from '../Styles'
import {AdMobBanner} from 'expo-ads-admob'

export default function LocationDetailsPage() {
  const historyState = useLocation()
  const [location, setLocation] = useState(historyState.state?.loc)
  const { id } = useParams()
  const classes = Styles()

  const AdmobBannerId = Platform.select({
    ios: () => {
      return 'ca-app-pub-1201256601321447/3572724672'
    },
    android: () => {
      return 'ca-app-pub-1201256601321447/9246927022'
    },
    default: () => {
      return '<View/>'
    },
  })()

  useEffect(() => {
    if (!location) {
      axios
        .get('https://photohunter.herokuapp.com/api/location/' + id)
        .then(response => response.data)
        .then(setLocation)
        .catch(error => {
          console.error(error)
        })
    }
  }, [id, location, setLocation])

  return (
    <ScrollView>
      <View style={{ ...classes.card, ...classes.shadow }}>
        <Image
          style={classes.media}
          source={{
            uri: location.thumbnail
              ? location.thumbnail.url
              : 'https://picsum.photos/300/200',
          }}
        />
        <View>
          <Text style={classes.text_title}>{location.title}</Text>
          <Text>{location.rating}</Text>
          <Text>{'Tags'}</Text>
          <Text display={'block'}>{location.description}</Text>
        </View>
      </View>
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <AdMobBanner
          bannerSize="largeBanner"
          adUnitID={AdmobBannerId}
          servePersonalizedAds={false}
        />
      </View>
    </ScrollView>
  )
}
