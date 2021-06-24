import useLocations from "../hooks/useLocations";
import LocationList from "../components/LocationList";
import {useState} from "react";
import LocationMap from "../components/LocationMap";

export default function LocationsPage({geoLocation}) {

    const [mapIsEnabled, setMapIsEnabled] = useState(false)
    const locations = useLocations(geoLocation)

    const switchView = (event, value) => {
        setMapIsEnabled(value)
    }

    return (
        <div>
            {mapIsEnabled ?
                <LocationMap locations={locations} switchView={switchView} geoLocation={geoLocation}/> :
                <LocationList locations={locations} switchView={switchView} geoLocation={geoLocation}/>}
        </div>
    );
}
