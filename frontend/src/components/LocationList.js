import LocationItem from "./LocationItem";
import {IconButton} from "@material-ui/core";
import MapIcon from "@material-ui/icons/Map";
import styled from "styled-components/macro";

export default function LocationList({locations, toggleView}) {
    return (
        <div>
            <Wrapper>
                <IconButton onClick={toggleView} aria-label="map" variant="outlined">
                    <MapIcon/>
                </IconButton>
            </Wrapper>
            {locations.map((location) => <LocationItem key={location.id} location={location}/>)}
        </div>
    )
}

const Wrapper = styled.div`
display: flex;
justify-content: end;
`
