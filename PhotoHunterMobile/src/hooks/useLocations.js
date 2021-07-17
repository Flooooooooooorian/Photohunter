import {useEffect, useState} from "react";
import axios from "axios";


export default function useLocations(geoLocation) {

    const [locations, setLocations] = useState([])
    const geoUrlData = `${geoLocation?`?lat=${geoLocation.latitude}&lng=${geoLocation.longitude}` : ""}`
    const url = `https://photohunter.herokuapp.com/api/location${geoUrlData}`

    useEffect(() => {
        axios.get(url)
            .then((response) => response.data)
            .then(setLocations)
            .catch(console.error)
    }, [url])

    return locations
}