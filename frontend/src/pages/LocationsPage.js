import useLocations from "../hooks/useLocations";
import LocationList from "../components/LocationList";
import {IconButton} from "@material-ui/core";
import MapIcon from '@material-ui/icons/Map';
import ListIcon from '@material-ui/icons/List';
import {useState} from "react";
import LocationMap from "../components/LocationMap";
import styled from "styled-components/macro";

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
                    <Wrapper>
                        <IconButton onClick={(event) => {switchView(event, false)}} aria-label="list" variant="outlined">
                            <ListIcon/>
                        </IconButton>
                    </Wrapper>
                    <LocationMap locations={locations} />
                </> :
                <>
                    <Wrapper>
                        <IconButton onClick={(event) => {switchView(event, true)}} aria-label="map" variant="outlined">
                            <MapIcon/>
                        </IconButton>
                    </Wrapper>
                    <LocationList locations={locations}/>
                </>}
        </div>
    );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: end;
`