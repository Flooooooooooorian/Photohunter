import {Marker} from "@react-google-maps/api";

export default function LocationMarker({location, showDetailsPage}) {

    const handleMarkerClick = () => {
        showDetailsPage(location)
    }

    return (
        <Marker position={{lat: location.lat, lng: location.lng}} onClick={handleMarkerClick}/>
    )
}
