import {Marker} from "@react-google-maps/api";
import {useHistory} from 'react-router-dom';

export default function LocationMarker(props) {

    const history = useHistory()

    const handleMarkerClick = () => {
        history.push("locations/" + props.location.id)
    }

    return (
        <Marker {...props} onClick={handleMarkerClick}/>
    )
}
