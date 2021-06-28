import {Marker} from "@react-google-maps/api";
import circle from "../resources/circle-16.ico"

export default function GeoLocationMarker({geoLocation}) {
    console.log(geoLocation)

    return (
        <Marker
            position={{lat: geoLocation.latitude, lng: geoLocation.longitude}}
            icon={circle}
        />
    )
}