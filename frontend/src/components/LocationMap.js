import {IconButton} from "@material-ui/core";
import ListIcon from "@material-ui/icons/List";
import GoogleMapsContainer from "./GoogleMapsContainer";
import styled from "styled-components/macro";

export default function LocationMap({locations, toggleView, geoLocation, showDetailsPage, showCreateLocationPage}) {

    return (
        <>
            <Wrapper>
                <IconButton onClick={toggleView} aria-label="list" variant="outlined">
                    <ListIcon/>
                </IconButton>
            </Wrapper>
            <GoogleMapsContainer handleMapClick={showCreateLocationPage} handleMarkerClick={showDetailsPage} locations={locations} geoLocation={geoLocation} styles={{}}/>
        </>
    )

}

const Wrapper = styled.div`
display: flex;
justify-content: end;
`
