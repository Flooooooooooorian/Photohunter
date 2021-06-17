import useLocations from "../hooks/useLocations";
import LocationList from "../components/LocationList";
import {IconButton} from "@material-ui/core";
import MapIcon from '@material-ui/icons/Map';
import ListIcon from '@material-ui/icons/List';
import {useState} from "react";

export default function LocationsPage() {

    const locations = useLocations()
    const [mapIsEnabled, enableMap] = useState(false)

    const switchView = (event, value) => {
        event.preventDefault()
        enableMap(value)
    }

    return (
        <div>
            {mapIsEnabled ?
                <>
                    <IconButton onClick={(event) => {switchView(event, false)}} aria-label="list" variant="outlined">
                        <ListIcon/>
                    </IconButton>
                </> :
                <>
                    <IconButton onClick={(event) => {switchView(event, true)}} aria-label="map" variant="outlined">
                        <MapIcon/>
                    </IconButton>
                    <LocationList locations={locations}/>
                </>}
        </div>
    );
}