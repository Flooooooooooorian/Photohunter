import {Marker} from "@react-google-maps/api";

export default function LocationMarker({location, handleMarkerClick}) {

    const handleClick = () => {
        handleMarkerClick(location)
    }

    return (
        <Marker position={{lat: location.lat, lng: location.lng}} onClick={handleClick}/>
    )
}
