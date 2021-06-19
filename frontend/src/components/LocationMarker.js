import {Marker} from "@react-google-maps/api";
import {useHistory} from 'react-router-dom';

export default function LocationMarker(props) {

    const history = useHistory()

    const handleMarkerClick = () => {
        console.log(props.location)
        history.push("locations/" + props.location.id)
    }

    return (
        <Marker {...props} onClick={handleMarkerClick}/>
    )
}
