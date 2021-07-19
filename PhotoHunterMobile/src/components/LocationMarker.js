import {Marker} from "react-native-maps";
import React from "react";

export default function LocationMarker({location, handleMarkerClick}) {

    const handleClick = () => {
        handleMarkerClick(location)
    }

    return (
        <Marker onClick={handleClick}  coordinate={{latitude: location.lat, longitude: location.lng}}/>
    )
}
