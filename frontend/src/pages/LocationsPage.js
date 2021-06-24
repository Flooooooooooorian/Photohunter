import useLocations from "../hooks/useLocations";
import LocationList from "../components/LocationList";
import {useState} from "react";
import LocationMap from "../components/LocationMap";

export default function LocationsPage({geoLocation}) {

    const [mapIsEnabled, setMapIsEnabled] = useState(false)
    const locations = useLocations(geoLocation)

    const toggleView = () => {
        setMapIsEnabled(!mapIsEnabled)
    }

    return (
        <div>
            {mapIsEnabled ?
                <LocationMap locations={locations} toggleView={toggleView} geoLocation={geoLocation}/> :
                <LocationList locations={locations} toggleView={toggleView} geoLocation={geoLocation}/>}
        </div>
    );
}
