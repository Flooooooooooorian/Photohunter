import LocationItem from './LocationItem'
import React from 'react'
import {ScrollView} from 'react-native'
import Styles from '../Styles'
import LocationActionBar from './LocationActionBar'

export default function LocationList({
  locations,
  toggleView,
  showDetailsPage,
}) {
  const classes = Styles()

  return (
    <ScrollView style={classes.card}>
      <LocationActionBar toggleView={toggleView} icon={'map'} />
      {locations.map(location => (
        <LocationItem
          key={location.id}
          showDetailsPage={showDetailsPage}
          location={location}
        />
      ))}
    </ScrollView>
  )
}
