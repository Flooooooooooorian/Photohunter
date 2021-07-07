import useLocations from "../hooks/useLocations";
import LocationList from "../components/LocationList";
import {useState} from "react";
import LocationMap from "../components/LocationMap";
import {useHistory} from "react-router-dom";

export default function LocationsPage({geoLocation}) {

    const [mapIsEnabled, setMapIsEnabled] = useState(false)
    const locations = useLocations(geoLocation)
    const history = useHistory()

    const toggleView = () => {
        setMapIsEnabled(!mapIsEnabled)
    }

    const showDetailsPage = (location) => {
        history.push({
            pathname: "/locations/" + location.id,
            state: {loc: location}
        })
    }

    const showCreateLocationPage = (event) => {
        history.push(`/locations/new/?lat=${event.latLng.lat()}&lng=${event.latLng.lng()}`)
    }

    return (
        <div>
            {mapIsEnabled ?
                <LocationMap showCreateLocationPage={showCreateLocationPage} showDetailsPage={showDetailsPage} locations={locations} toggleView={toggleView} geoLocation={geoLocation}/> :
                <LocationList showDetailsPage={showDetailsPage} locations={locations} toggleView={toggleView} geoLocation={geoLocation}/>}
        </div>
    );
}
