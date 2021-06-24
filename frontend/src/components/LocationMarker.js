import {Marker} from "@react-google-maps/api";
import {useHistory} from 'react-router-dom';

export default function LocationMarker({key, location}) {

    const history = useHistory()

    const handleMarkerClick = () => {
        history.push("locations/" + location.id)
    }

    return (
        <Marker key={key} position={{lat: location.lat, lng: location.lng}} onClick={handleMarkerClick}/>
    )
}
