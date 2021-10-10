import React from 'react'
import GoogleMapsContainer from './GoogleMapsContainer'
import {View} from 'react-native'
import Styles from '../Styles'
import LocationActionBar from './LocationActionBar'

export default function LocationMap({
  locations,
  toggleView,
  geoLocation,
  showDetailsPage,
  showCreateLocationPage,
}) {
  const classes = Styles()

  return (
    <>
      <View style={classes.card}>
        <LocationActionBar toggleView={toggleView} icon={'list'} />
      </View>
      <GoogleMapsContainer
        handleMapClick={showCreateLocationPage}
        handleMarkerClick={showDetailsPage}
        locations={locations}
        geoLocation={geoLocation}
        styles={{}}
      />
    </>
  )
}
