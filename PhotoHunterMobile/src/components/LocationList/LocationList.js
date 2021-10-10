import LocationItem from './LocationItem'
import React from 'react'
import LocationActionBar from './LocationActionBar'
import CardScrollView from '../CardScrollView'

export default function LocationList({
  locations,
  toggleView,
  showDetailsPage,
}) {
  return (
    <CardScrollView>
      <LocationActionBar toggleView={toggleView} icon={'map'} />
      {locations.map(location => (
        <LocationItem
          key={location.id}
          showDetailsPage={showDetailsPage}
          location={location}
        />
      ))}
    </CardScrollView>
  )
}
