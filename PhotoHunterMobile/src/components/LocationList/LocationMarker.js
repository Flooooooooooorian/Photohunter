import { Marker } from 'react-native-maps'
import React from 'react'

export default function LocationMarker({ location, handleMarkerClick }) {
  const handleClick = () => {
    handleMarkerClick(location)
  }

  return (
    <Marker
      onPress={handleClick}
      coordinate={{ latitude: location.lat, longitude: location.lng }}
    />
  )
}
