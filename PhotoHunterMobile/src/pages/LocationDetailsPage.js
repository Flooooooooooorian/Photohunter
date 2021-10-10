import React from 'react'
import { useParams } from 'react-router-dom'
import { Image, StyleSheet, Text, View } from 'react-native'
import Styles from '../Styles'
import useDetailedLocations from '../hooks/useDetailedLocations'
import styled from 'styled-components/native'
import AdBanner from '../components/AdBanner'
import CardScrollView from '../components/CardScrollView'

export default function LocationDetailsPage() {
  const { id } = useParams()
  const classes = Styles()

  const { detailedLocation } = useDetailedLocations(id)

  return (
    <CardScrollView>
      <View style={style.shadow}>
        <Image
          style={classes.media}
          source={{
            uri: detailedLocation.thumbnail
              ? detailedLocation.thumbnail.url
              : 'https://picsum.photos/300/200',
          }}
        />
        <DetailedLocationContent>
          <Text style={classes.text_title}>{detailedLocation.title}</Text>
          <Text>{detailedLocation.rating}</Text>
          <Text>{'Tags'}</Text>
          <Text display={'block'}>{detailedLocation.description}</Text>
        </DetailedLocationContent>
      </View>
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <AdBanner />
      </View>
    </CardScrollView>
  )
}

const DetailedLocationContent = styled.View`
  margin: 5px;
`

const style = StyleSheet.create({
  shadow: {
    margin: 5,
    // boxShadow: '5px 5px 11px -7px #000000',
    backgroundColor: '#FFFFFE',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
})
