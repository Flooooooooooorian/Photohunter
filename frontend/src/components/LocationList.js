import LocationItem from "./LocationItem";
import {IconButton} from "@material-ui/core";
import MapIcon from "@material-ui/icons/Map";
import styled from "styled-components/macro";

export default function LocationList({locations, toggleView, showDetailsPage}) {
    return (
        <>
            <Wrapper>
                <IconButton onClick={toggleView} aria-label="map" variant="outlined">
                    <MapIcon/>
                </IconButton>
            </Wrapper>
            {locations.map((location) => <LocationItem key={location.id} showDetailsPage={showDetailsPage} location={location}/>)}
        </>
    )
}

const Wrapper = styled.div`
display: flex;
justify-content: end;
`
