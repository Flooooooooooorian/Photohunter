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

    return (
        <div>
            {mapIsEnabled ?
                <LocationMap showDetailsPage={showDetailsPage} locations={locations} toggleView={toggleView} geoLocation={geoLocation}/> :
                <LocationList showDetailsPage={showDetailsPage} locations={locations} toggleView={toggleView} geoLocation={geoLocation}/>}
        </div>
    );
}
