import React from 'react'
import { useParams } from 'react-router-dom'
import { Image, ScrollView, Text, View } from 'react-native'
import Styles from '../Styles'
import useDetailedLocations from '../hooks/useDetailedLocations'
import styled from 'styled-components/native'
import AdBanner from '../components/AdBanner'

export default function LocationDetailsPage() {
  const { id } = useParams()
  const classes = Styles()

  const { detailedLocation } = useDetailedLocations(id)

  return (
    <ScrollView>
      <View style={{ ...classes.card, ...classes.shadow }}>
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
    </ScrollView>
  )
}

const DetailedLocationContent = styled.View`
  margin: 5px;
`
