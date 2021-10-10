import React from 'react'
import GoogleMapsContainer from '../GoogleMapsContainer'
import LocationActionBar from './LocationActionBar'
import CardView from '../CardView'

export default function LocationMap({
  locations,
  toggleView,
  geoLocation,
  showDetailsPage,
  showCreateLocationPage,
}) {
  return (
    <>
      <CardView>
        <LocationActionBar toggleView={toggleView} icon={'list'} />
      </CardView>
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
