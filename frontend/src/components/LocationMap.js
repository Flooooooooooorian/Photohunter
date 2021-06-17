import {GoogleMap, useLoadScript} from "@react-google-maps/api";
import React from "react";
import styled from "styled-components/macro";

export default function LocationMap({locations}) {

    const googleLibraries = []
    const mapCenter = {
        lat: 51.163361,
        lng: 10.447683,
    }
    const mapContainerStyle = {
        width: '80vw',
        height: '80vh',
    }

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
        googleLibraries,
    })

    if (loadError) return "Error";
    if (!isLoaded) return "Loading...";

    return (
        <Wrapper>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={5}
                center={mapCenter}/>
        </Wrapper>
    )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`