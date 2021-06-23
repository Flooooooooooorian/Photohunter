import {useEffect, useState} from "react";
import axios from "axios";


export default function useLocations(geoLocation) {

    const [locations, setLocations] = useState([])
    const url = '/api/location' + [geoLocation? ["?lat=" + geoLocation.latitude + "&lng=" + geoLocation.longitude] : ""]

    useEffect(() => {
        axios.get(url)
            .then((response) => response.data)
            .then(setLocations)
    }, [])

    return locations
}