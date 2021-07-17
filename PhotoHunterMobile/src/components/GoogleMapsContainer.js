import MapView from 'react-native-maps';
import React from "react";
import LocationMarker from "./LocationMarker";
import GeoLocationMarker from "./GeoLocationMarker";

export default function GoogleMapsContainer({
                                                locations,
                                                geoLocation,
                                                handleMarkerClick,
                                                handleMapClick,
                                                onMapLoad,
                                                styles
                                            }) {

    const googleLibraries = []

    const mapCenter = {
        lat: geoLocation ? geoLocation.latitude : 51.163361,
        lng: geoLocation ? geoLocation.longitude : 10.447683,
    }
    const mapContainerStyle = {
        width: '100vw',
        height: '70vh',
        marginVertical: 15,
        marginHorizontal: 25,
        ...styles
    }

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        googleLibraries,
    })

    if (loadError) return "Error";
    if (!isLoaded) return "Loading...";

    return (
        <MapView
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
        </MapView>
    )
}
