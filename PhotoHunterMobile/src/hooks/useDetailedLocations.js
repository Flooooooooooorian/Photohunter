import { useEffect, useState } from 'react'
import axios from 'axios'
import ServerConfig from '../../ServerConfig'

export default function useDetailedLocations(id) {
  const [detailedLocation, setDetailedLocation] = useState({})

  useEffect(() => {
    axios
      .get(ServerConfig().ip + '/api/location/' + id)
      .then(response => response.data)
      .then(setDetailedLocation)
      .catch(error => {
        console.error(error)
      })
  }, [id, setDetailedLocation])

  return {
    detailedLocation,
  }
}
