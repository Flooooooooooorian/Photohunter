import {GoogleMap, useLoadScript} from "@react-google-maps/api";
import React from "react";
import styled from "styled-components/macro";
import LocationMarker from "./LocationMarker";
import GeoLocationMarker from "./GeoLocationMarker";

export default function GoogleMapsContainer({locations, geoLocation, handleMarkerClick, handleMapClick, onMapLoad, styles}) {

    const googleLibraries = []

    const mapCenter = {
        lat: geoLocation ? geoLocation.latitude : 51.163361,
        lng: geoLocation ? geoLocation.longitude : 10.447683,
    }
    const mapContainerStyle = {
        width: '80vw',
        height: '80vh',
        ...styles
    }

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        googleLibraries,
    })

    if (loadError) return "Error";
    if (!isLoaded) return "Loading...";

    return (
        <Wrapper>
            <GoogleMap
                onClick={handleMapClick}
                onLoad={onMapLoad}
                mapContainerStyle={mapContainerStyle}
                zoom={9}
                center={mapCenter}>
                {geoLocation && <GeoLocationMarker geoLocation={geoLocation}/>}
                {locations.map((location) =>
                    <LocationMarker handleMarkerClick={handleMarkerClick} key={location.id} location={location}/>
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
