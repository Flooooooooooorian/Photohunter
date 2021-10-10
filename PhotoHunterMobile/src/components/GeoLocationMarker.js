import {Marker} from 'react-native-maps'
import React from 'react'
//import circle from "../assets/circle-16.ico"

export default function GeoLocationMarker({ geoLocation }) {
  return (
    <Marker
      coordinate={{
        latitude: geoLocation.latitude,
        longitude: geoLocation.longitude,
      }}
    />
  )
}
