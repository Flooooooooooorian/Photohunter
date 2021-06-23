import {IconButton} from "@material-ui/core";
import ListIcon from "@material-ui/icons/List";
import GoogleMapsContainer from "./GoogleMapsContainer";
import styled from "styled-components/macro";

export default function LocationMap({locations, switchView, geoLocation}) {

    return (
        <>
            <Wrapper>
                <IconButton onClick={(event) => {
                    switchView(event, false)
                }} aria-label="list" variant="outlined">
                    <ListIcon/>
                </IconButton>
            </Wrapper>
            <GoogleMapsContainer locations={locations} geoLocation={geoLocation}/>
        </>
    )

}

const Wrapper = styled.div`
display: flex;
justify-content: end;
`
