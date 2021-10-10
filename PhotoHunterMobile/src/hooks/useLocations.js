import {useEffect, useState} from 'react'
import axios from 'axios'
import ServerConfig from '../../ServerConfig'

export default function useLocations(geoLocation) {
  const [locations, setLocations] = useState([])
  const geoUrlData = `${
    geoLocation
      ? `?lat=${geoLocation.latitude}&lng=${geoLocation.longitude}`
      : ''
  }`
  const url = ServerConfig().ip + `/api/location${geoUrlData}`

  useEffect(() => {
    axios
      .get(url)
      .then(response => response.data)
      .then(setLocations)
      .catch(console.error)
  }, [url])

  return locations
}
