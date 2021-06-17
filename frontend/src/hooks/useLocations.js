import {useEffect, useState} from "react";
import axios from "axios";


export default function useLocations() {

    const [locations, setLocations] = useState([])

    useEffect(() => {
        axios.get('/api/location')
            .then((response) => response.data)
            .then((data) => setLocations(data))
    }, [])

    return locations
}