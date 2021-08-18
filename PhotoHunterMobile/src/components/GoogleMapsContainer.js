import MapView from 'react-native-maps';
import React, {useState} from "react";
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

    const [region, setRegion] = useState({
        latitude: geoLocation ? geoLocation.latitude : 51.163361,
        longitude: geoLocation ? geoLocation.longitude : 10.447683,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    })

    const mapContainerStyle = {
        width: '100vw',
        height: '70vh',
        marginVertical: 15,
        marginHorizontal: 25,
        ...styles
    }

    const onRegionChange = (region) => {
        setRegion({region});
    }

    return (
        <MapView
            onPress={handleMapClick}
            zoom={9}
            initialRegion={region}
            onRegionChange={onRegionChange}>

            {geoLocation && <GeoLocationMarker geoLocation={geoLocation}/>}
            {locations.map((location) =>
                <LocationMarker handleMarkerClick={handleMarkerClick} key={location.id} location={location}/>
            )
            }
        </MapView>
    )
}
