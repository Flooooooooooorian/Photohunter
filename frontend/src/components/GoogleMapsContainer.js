import {GoogleMap, useLoadScript} from "@react-google-maps/api";
import React from "react";
import styled from "styled-components/macro";
import LocationMarker from "./LocationMarker";
import {useHistory} from "react-router-dom";

export default function GoogleMapsContainer({locations, geoLocation, showDetailsPage}) {

    const googleLibraries = []
    const history = useHistory()
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

    const handleMapClick = (event) => {
        history.push(`/locations/new/?lat=${event.latLng.lat()}&lng=${event.latLng.lng()}`)
    }

    if (loadError) return "Error";
    if (!isLoaded) return "Loading...";

    return (
        <Wrapper>
            <GoogleMap
                onClick={handleMapClick}
                mapContainerStyle={mapContainerStyle}
                zoom={9}
                center={mapCenter}>
                {locations.map((location) =>
                    <LocationMarker showDetailsPage={showDetailsPage} key={location.id} location={location}/>
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
