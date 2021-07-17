import {Marker} from "react-native-maps";
//import circle from "../assets/circle-16.ico"

export default function GeoLocationMarker({geoLocation}) {

    return (
        <Marker
            position={{lat: geoLocation.latitude, lng: geoLocation.longitude}}
        />
    )
}