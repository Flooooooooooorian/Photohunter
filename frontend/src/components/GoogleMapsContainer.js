import {GoogleMap, useLoadScript} from "@react-google-maps/api";
import React from "react";
import styled from "styled-components/macro";
import LocationMarker from "./LocationMarker";

export default function GoogleMapsContainer({locations, geoLocation}) {

    const googleLibraries = []
    const mapCenter = {
        lat: geoLocation ? geoLocation.latitude : 51.163361,
        lng: geoLocation ? geoLocation.longitude : 10.447683,
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
                zoom={6}
                center={mapCenter}>
                {locations.map((location) =>
                    <LocationMarker key={location.id} position={{lat: location.lat, lng: location.lng}} location={location}/>
                    )
                }
            </GoogleMap>
        </Wrapper>
    )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`
