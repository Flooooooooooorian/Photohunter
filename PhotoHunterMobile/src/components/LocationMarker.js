import {Marker} from "react-native-maps";

export default function LocationMarker({location, handleMarkerClick}) {

    const handleClick = () => {
        handleMarkerClick(location)
    }

    return (
        <Marker position={{lat: location.lat, lng: location.lng}} onClick={handleClick} />
    )
}
