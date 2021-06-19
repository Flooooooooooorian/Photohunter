import useLocations from "../hooks/useLocations";
import LocationList from "../components/LocationList";
import {useState} from "react";
import LocationMap from "../components/LocationMap";

export default function LocationsPage() {

    const locations = useLocations()
    const [mapIsEnabled, setMapIsEnabled] = useState(false)

    const switchView = (event, value) => {
        event.preventDefault()
        setMapIsEnabled(value)
    }

    return (
        <div>
            {mapIsEnabled ?
                <LocationMap locations={locations} switchView={switchView}/> :
                <LocationList locations={locations} switchView={switchView}/>}
        </div>
    );
}
